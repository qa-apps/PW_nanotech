import { expect, type Page } from '@playwright/test';

export type ContactPayload = {
  fullName: string;
  email: string;
  company: string;
  message: string;
};

export class ContactPage {
  constructor(private readonly page: Page) {}

  async open() {
    await this.page.goto('/#contact', { waitUntil: 'domcontentloaded' });
    await expect(this.page.getByRole('heading', { name: 'Get in Touch' })).toBeVisible();
  }

  async fillForm(payload: ContactPayload) {
    await this.page.getByRole('textbox', { name: 'Full Name' }).fill(payload.fullName);
    await this.page.getByRole('textbox', { name: 'Email Address' }).fill(payload.email);
    await this.page.getByRole('textbox', { name: 'Company' }).fill(payload.company);
    await this.page.locator('textarea#message').fill(payload.message);
  }

  async selectService(serviceName: string) {
    const select = this.page.getByLabel('Service Interest');
    await expect(select).toBeVisible();
    await select.selectOption(serviceName);
  }

  async expectServiceOptionPresent(serviceName: string) {
    const select = this.page.getByLabel('Service Interest');
    await expect(select.locator('option', { hasText: serviceName })).toBeAttached();
  }

  async submit() {
    await this.page.getByRole('button', { name: 'Send Message' }).click();
  }

  async expectSuccessToast() {
    await expect(this.page.getByText('Message sent successfully', { exact: false })).toBeVisible();
  }
}
