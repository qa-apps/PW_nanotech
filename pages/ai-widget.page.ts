import { expect, type Locator, type Page } from '@playwright/test';

export class AIWidgetPage {
  constructor(private readonly page: Page) {}

  private toggleButton(): Locator {
    return this.page.locator('button').filter({ has: this.page.locator('svg') }).last();
  }

  async openChatWindow() {
    await this.toggleButton().click();
    await expect(this.page.getByText(/How can I help you/i)).toBeVisible();
  }

  async clickMode(mode: 'General' | 'Code' | 'Analyst' | 'Research' | 'Vision') {
    const button = this.page.getByRole('button', { name: new RegExp(`^${mode}$`, 'i') });
    await expect(button).toBeVisible();
    await button.click();
  }

  async ask(prompt: string) {
    const textArea = this.page.locator('textarea').last();
    if (await textArea.count()) {
      await expect(textArea).toBeVisible();
      await textArea.fill(prompt);
    } else {
      const textInput = this.page.locator('input[type="text"]').last();
      await expect(textInput).toBeVisible();
      await textInput.fill(prompt);
    }
    await this.page.getByRole('button', { name: /send/i }).click();
  }

  async expectNonEmptyResponse() {
    const responseBubble = this.page.locator('[class*="message"], [class*="response"]').last();
    await expect(responseBubble).toBeVisible({ timeout: 30_000 });
    const text = (await responseBubble.innerText()).trim();
    expect(text.length).toBeGreaterThan(3);
    expect(text.toLowerCase()).not.toContain('something went wrong');
    expect(text.toLowerCase()).not.toContain('error');
  }
}
