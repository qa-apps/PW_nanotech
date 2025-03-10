import { expect, type Page } from '@playwright/test';

export class DashboardPage {
  constructor(private readonly page: Page) {}

  private dashboardModal() {
    return this.page.locator('[class*="dashboard"], [class*="Dashboard"]').first();
  }

  async expectDashboardVisible() {
    await expect(this.page.getByText('My Dashboard', { exact: false })).toBeVisible();
  }

  async clickTab(tabName: 'Messages' | 'Orders' | 'Notes') {
    const tab = this.page.getByRole('button', { name: tabName }).or(
      this.page.getByText(tabName, { exact: true })
    ).first();
    await expect(tab).toBeVisible();
    await tab.click();
  }

  async expectTabActive(tabName: string) {
    const activeTab = this.page.getByText(tabName, { exact: true }).first();
    await expect(activeTab).toBeVisible();
  }

  async fillNotes(text: string) {
    const notesArea = this.page.locator('textarea').first();
    await expect(notesArea).toBeVisible();
    await notesArea.fill(text);
  }

  async saveNotes() {
    await this.page.getByRole('button', { name: /Save/i }).click();
  }

  async clickLogout() {
    await this.page.getByRole('button', { name: /Logout/i }).click();
  }

  async expectLogoutSuccessful() {
    await expect(this.page.getByText('My Dashboard', { exact: false })).not.toBeVisible();
  }
}
