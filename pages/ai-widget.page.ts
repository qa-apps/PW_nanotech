import { expect, type Page } from '@playwright/test';

export class AIWidgetPage {
  constructor(private readonly page: Page) {}

  async openChatWindow() {
    await this.page.getByRole('button', { name: 'Open chat' }).click();
    await expect(this.page.getByText(/How can I help you/i)).toBeVisible();
  }

  async clickMode(mode: 'Auto' | 'General' | 'Code' | 'Analyst' | 'Research' | 'Vision') {
    const button = this.page.getByRole('button', { name: mode });
    await expect(button).toBeVisible();
    await button.click();
  }

  async ask(prompt: string) {
    const input = this.page.getByRole('textbox', { name: 'Type your message' });
    await expect(input).toBeVisible();
    await input.fill(prompt);
    await this.page.getByRole('button', { name: 'Send message' }).click();
  }

  async expectNonEmptyResponse() {
    const responseBubble = this.page.locator('[class*="message"], [class*="response"]').last();
    await expect(responseBubble).toBeVisible({ timeout: 30_000 });
    const text = (await responseBubble.innerText()).trim();
    expect(text.length).toBeGreaterThan(3);
    expect(text.toLowerCase()).not.toContain('something went wrong');
  }
}
