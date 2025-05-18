import { test, expect } from '../fixtures/test-fixture';
import { TechnologyTickerPage } from '../pages/technology-ticker.page';

test.describe('Technology Ticker / Marquee', () => {
  test('all technology keywords are present in the ticker', async ({ page, home }) => {
    await home.goto('/');
    const ticker = new TechnologyTickerPage(page);
    await ticker.expectTickerVisible();
  });

  test('ticker has animation applied', async ({ page, home }) => {
    await home.goto('/');
    const ticker = new TechnologyTickerPage(page);
    await ticker.expectTickerAnimates();
  });

  test('Agentic AI keyword is present', async ({ page, home }) => {
    await home.goto('/');
    await expect(page.getByText('Agentic AI', { exact: false }).first()).toBeAttached();
  });

  test('Generative AI keyword is present', async ({ page, home }) => {
    await home.goto('/');
    await expect(page.getByText('Generative AI', { exact: false }).first()).toBeAttached();
  });

  test('Multi-Agent Systems keyword is present', async ({ page, home }) => {
    await home.goto('/');
    await expect(page.getByText('Multi-Agent Systems', { exact: false }).first()).toBeAttached();
  });
});
