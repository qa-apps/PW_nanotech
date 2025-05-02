import { test, expect } from '../fixtures/test-fixture';
import { IndustriesSectionPage } from '../pages/industries-section.page';

test.describe('Industries Section', () => {
  test('industries section heading is visible', async ({ page, home }) => {
    await home.goto('/');
    const industries = new IndustriesSectionPage(page);
    await industries.scrollToIndustries();
  });

  test('Transforming Industries heading is present', async ({ page, home }) => {
    await home.goto('/');
    const industries = new IndustriesSectionPage(page);
    await industries.scrollToIndustries();
    await industries.expectTransformingIndustriesHeading();
  });

  test('all 6 industry cards are visible', async ({ page, home }) => {
    await home.goto('/');
    const industries = new IndustriesSectionPage(page);
    await industries.scrollToIndustries();
    await industries.expectAllIndustryCardsVisible();
  });

  test('Financial Services card has description text', async ({ page, home }) => {
    await home.goto('/');
    const industries = new IndustriesSectionPage(page);
    await industries.scrollToIndustries();
    await industries.expectIndustryDescriptionVisible('Financial Services');
  });

  test('Healthcare card has description text', async ({ page, home }) => {
    await home.goto('/');
    const industries = new IndustriesSectionPage(page);
    await industries.scrollToIndustries();
    await industries.expectIndustryDescriptionVisible('Healthcare');
  });

  test('Manufacturing card has description text', async ({ page, home }) => {
    await home.goto('/');
    const industries = new IndustriesSectionPage(page);
    await industries.scrollToIndustries();
    await industries.expectIndustryDescriptionVisible('Manufacturing');
  });
});
