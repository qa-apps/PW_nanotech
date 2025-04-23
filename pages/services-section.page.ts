import { expect, type Page } from '@playwright/test';

export class ServicesSectionPage {
  constructor(private readonly page: Page) {}

  async scrollToServices() {
    const heading = this.page.getByText('Autonomous Agent Services', { exact: false }).first();
    await heading.scrollIntoViewIfNeeded();
    await expect(heading).toBeVisible();
  }

  async expectServiceCardVisible(title: string) {
    await expect(
      this.page.getByText(title, { exact: false }).first()
    ).toBeVisible();
  }

  async expectAllServiceCardsVisible() {
    const cards = [
      'Agentic Process Automation',
      'AI Agent Development',
      'AI Agent Orchestration & Integration',
      'Business Process Analysis',
      'AI Testing & Quality Assurance',
      'AI Strategy Consulting'
    ];

    for (const card of cards) {
      await expect(
        this.page.getByText(card, { exact: false }).first()
      ).toBeVisible();
    }
  }

  async expectServiceCardHasBullets(title: string) {
    const card = this.page.locator('[class*="card"], article, section')
      .filter({ hasText: title }).first();
    await expect(card).toBeVisible();
    const bullets = card.locator('li');
    expect(await bullets.count()).toBeGreaterThan(0);
  }
}
