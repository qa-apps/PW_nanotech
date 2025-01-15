import { expect, type Page } from '@playwright/test';

export type ContactPayload = {
  fullName: string;
  email: string;
  company: string;
  serviceInterest: string;
  message: string;
};

export class ContactPage {
  constructor(private readonly page: Page) {}

  private formRoot() {
    return this.page.locator('form').first();
  }

  async open() {
    await this.page.goto('/#contact', { waitUntil: 'domcontentloaded' });
    await expect(this.page.getByRole('heading', { name: 'Get in Touch' })).toBeVisible();
  }

  async fillForm(payload: ContactPayload) {
    const form = this.formRoot();
    const textInputs = form.locator('input');
    await textInputs.nth(0).fill(payload.fullName);
    await textInputs.nth(1).fill(payload.email);
    await textInputs.nth(2).fill(payload.company);
    await textInputs.nth(3).fill(payload.serviceInterest);
    await form.locator('textarea').first().fill(payload.message);
  }

  async selectService(serviceName: string) {
    const select = this.formRoot().locator('select').first();
    await expect(select).toBeVisible();
    await select.selectOption({ label: serviceName });
  }

  async expectServiceOptionPresent(serviceName: string) {
    const option = this.formRoot().locator('select option', { hasText: serviceName }).first();
    await expect(option).toBeVisible();
  }

  async submit() {
    await this.formRoot().getByRole('button', { name: 'Send Message' }).click();
  }

  async expectSuccessToast() {
    await expect(this.page.getByText('Message sent successfully!', { exact: false })).toBeVisible();
  }
}
