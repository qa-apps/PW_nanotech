import { test, expect } from '../fixtures/test-fixture';
import { ServicesSectionPage } from '../pages/services-section.page';

test.describe('Services Section', () => {
  test.beforeEach(async ({ home }) => {
    await home.goto('/');
  });

  test('services section heading is visible', async ({ page, home }) => {
    const services = new ServicesSectionPage(page);
    await services.scrollToServices();
  });

  test('all 6 service cards are visible', async ({ page, home }) => {
    const services = new ServicesSectionPage(page);
    await services.scrollToServices();
    await services.expectAllServiceCardsVisible();
  });

  test('Agentic Process Automation card has bullet points', async ({ page, home }) => {
    const services = new ServicesSectionPage(page);
    await services.scrollToServices();
    await services.expectServiceCardHasBullets('Agentic Process Automation');
  });

  test('AI Agent Development card has bullet points', async ({ page, home }) => {
    const services = new ServicesSectionPage(page);
    await services.scrollToServices();
    await services.expectServiceCardHasBullets('AI Agent Development');
  });

  test('AI Testing & Quality Assurance card is visible', async ({ page, home }) => {
    const services = new ServicesSectionPage(page);
    await services.scrollToServices();
    await services.expectServiceCardVisible('AI Testing & Quality Assurance');
  });

  test('AI Strategy Consulting card has bullet points', async ({ page, home }) => {
    const services = new ServicesSectionPage(page);
    await services.scrollToServices();
    await services.expectServiceCardHasBullets('AI Strategy Consulting');
  });
});
