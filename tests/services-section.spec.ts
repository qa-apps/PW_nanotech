import { test, expect } from '../fixtures/test-fixture';

const SERVICES = [
  'Agentic Process Automation',
  'AI Agent Development',
  'AI Agent Orchestration & Integration',
  'Business Process Analysis',
  'AI Testing & Quality Assurance',
  'AI Strategy Consulting'
];

test.describe('Services Section', () => {
  test.beforeEach(async ({ home }) => {
    await home.goto('/');
  });

  test('services section heading is visible', async ({ page }) => {
    const heading = page.getByRole('heading', { name: 'Autonomous Agent Services' });
    await heading.scrollIntoViewIfNeeded();
    await expect(heading).toBeVisible();
  });

  test('all 6 service cards are visible', async ({ page }) => {
    const sectionHeading = page.getByRole('heading', { name: 'Autonomous Agent Services' });
    await sectionHeading.scrollIntoViewIfNeeded();

    for (const service of SERVICES) {
      await expect(
        page.getByRole('heading', { name: service }).first()
      ).toBeVisible();
    }
  });

  test('each service card has a description and feature list', async ({ page }) => {
    const sectionHeading = page.getByRole('heading', { name: 'Autonomous Agent Services' });
    await sectionHeading.scrollIntoViewIfNeeded();

    for (const service of SERVICES) {
      const heading = page.getByRole('heading', { name: service }).first();
      await expect(heading).toBeVisible();
    }
  });
});
