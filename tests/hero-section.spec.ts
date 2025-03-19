import { test, expect } from '../fixtures/test-fixture';
import { HeroPage } from '../pages/hero.page';

test.describe('Hero Section', () => {
  test('hero heading and subheading are visible', async ({ page, home }) => {
    await home.goto('/');
    const hero = new HeroPage(page);
    await hero.expectHeroHeadingVisible();
    await hero.expectSubheadingVisible();
  });

  test('Schedule AI Assessment button is visible and clickable', async ({ page, home }) => {
    await home.goto('/');
    const hero = new HeroPage(page);
    await hero.clickScheduleAssessment();
    await expect(page).toHaveURL(/#contact/);
  });

  test('See AI in Action button is visible and clickable', async ({ page, home }) => {
    await home.goto('/');
    const hero = new HeroPage(page);
    await hero.clickSeeAIInAction();
    await expect(page).toHaveURL(/#services|#solutions/);
  });

  test('top announcement banner is visible with correct text', async ({ page, home }) => {
    await home.goto('/');
    const hero = new HeroPage(page);
    await hero.expectTopBannerVisible();
    await hero.expectTopBannerLearnMoreClickable();
  });

  test('Learn More link in banner navigates to services section', async ({ page, home }) => {
    await home.goto('/');
    const hero = new HeroPage(page);
    await hero.clickLearnMore();
    await page.waitForTimeout(500);
    const url = page.url();
    expect(url).toMatch(/#|services|solutions/);
  });

  test('banner has visible color scheme and styling', async ({ page, home }) => {
    await home.goto('/');
    const hero = new HeroPage(page);
    await hero.expectBannerColorScheme();
  });
});
