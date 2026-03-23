import { expect, type Locator, type Page } from '@playwright/test';

export class AIWidgetPage {
  constructor(private readonly page: Page) {}

  private chatWindow(): Locator {
    return this.page.locator('#chat-window');
  }

  private consentOverlay(): Locator {
    return this.page.locator('#chat-consent-overlay');
  }

  private consentCheckbox(): Locator {
    return this.page.locator('#chat-consent-checkbox');
  }

  private consentAgreeButton(): Locator {
    return this.page.locator('#chat-consent-agree');
  }

  private chatInput(): Locator {
    return this.page.locator('#chat-input');
  }

  private modeButton(mode: 'Auto' | 'General' | 'Code' | 'Analyst' | 'Research' | 'Vision'): Locator {
    return this.page.locator('#chat-agent-bar .agent-btn').filter({ hasText: mode }).first();
  }

  private chatSendButton(): Locator {
    return this.page.locator('#chat-form button.chat-send-btn, #chat-form button[aria-label="Send message"]').first();
  }

  private async acceptConsentIfPresent() {
    const overlay = this.consentOverlay();
    if (!(await overlay.isVisible().catch(() => false))) return;

    const checkbox = this.consentCheckbox();
    await expect(checkbox).toBeVisible();
    await checkbox.check();

    const agreeButton = this.consentAgreeButton();
    await expect(agreeButton).toBeEnabled();
    await agreeButton.click();
    await expect(overlay).toBeHidden();
  }

  async openChatWindow() {
    await this.page.getByRole('button', { name: 'Open chat' }).click();
    await expect(this.chatWindow()).toBeVisible();
    await expect(this.page.getByText(/How can I help you/i)).toBeVisible();
    await this.acceptConsentIfPresent();
  }

  async clickMode(mode: 'Auto' | 'General' | 'Code' | 'Analyst' | 'Research' | 'Vision') {
    await this.acceptConsentIfPresent();
    const button = this.modeButton(mode);
    await expect(button).toBeVisible();
    await button.click({ force: true });
  }

  async ask(prompt: string) {
    await this.acceptConsentIfPresent();
    const input = this.chatInput();
    await expect(input).toBeVisible();
    await expect(input).toBeEditable();
    await input.fill(prompt);
    await this.chatSendButton().click({ force: true });
  }

  async expectSendButtonVisible() {
    await expect(this.chatSendButton()).toBeVisible();
  }

  async expectNonEmptyResponse() {
    const responseBubble = this.page.locator('[class*="message"], [class*="response"]').last();
    await expect(responseBubble).toBeVisible({ timeout: 30_000 });
    const text = (await responseBubble.innerText()).trim();
    expect(text.length).toBeGreaterThan(3);
    expect(text.toLowerCase()).not.toContain('something went wrong');
  }
}
