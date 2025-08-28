import { test, expect } from '../fixtures/test-fixture';
import { HeroPage } from '../pages/hero.page';

test.describe('Hero Section', () => {
  test.beforeEach(async ({ home }) => {
    await home.goto('/');
  });

  test('hero heading and subheading are visible', async ({ page }) => {
    const hero = new HeroPage(page);
    await hero.expectHeroHeadingVisible();
    await hero.expectSubheadingVisible();
  });

  test('Schedule AI Assessment link is visible and clickable', async ({ page }) => {
    const hero = new HeroPage(page);
    const link = page.getByRole('link', { name: 'Schedule AI Assessment' });
    await expect(link).toBeVisible();
    const href = await link.getAttribute('href');
    expect(href).toContain('#contact');
  });

  test('See AI in Action link is visible and clickable', async ({ page }) => {
    const hero = new HeroPage(page);
    const link = page.getByRole('link', { name: 'See AI in Action' });
    await expect(link).toBeVisible();
    await expect(link).toBeEnabled();
  });

  test('top announcement banner is visible with correct text', async ({ page }) => {
    const hero = new HeroPage(page);
    await hero.expectTopBannerVisible();
    await hero.expectTopBannerLearnMoreClickable();
  });

  test('Learn More link has correct href', async ({ page }) => {
    const learnMore = page.getByRole('link', { name: /Learn More/i }).first();
    await expect(learnMore).toBeVisible();
    const href = await learnMore.getAttribute('href');
    expect(href).toContain('#services');
  });

  test('banner has visible color scheme and styling', async ({ page }) => {
    const hero = new HeroPage(page);
    await hero.expectBannerColorScheme();
  });
});
