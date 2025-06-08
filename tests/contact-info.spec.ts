import { test, expect } from '../fixtures/test-fixture';

test.describe('Contact Info Section', () => {
  test('email info@nanotech.icu is displayed', async ({ page, home }) => {
    await home.goto('/#contact');
    await expect(
      page.getByText('info@nanotech.icu', { exact: false }).first()
    ).toBeVisible();
  });

  test('phone number +44 7593 012313 is displayed', async ({ page, home }) => {
    await home.goto('/#contact');
    await expect(
      page.getByText('+44 7593 012313', { exact: false }).first()
    ).toBeVisible();
  });

  test('locations London and Gravesend are displayed', async ({ page, home }) => {
    await home.goto('/#contact');
    await expect(
      page.getByText('London, UK', { exact: false }).first()
    ).toBeVisible();
    await expect(
      page.getByText('Gravesend, UK', { exact: false }).first()
    ).toBeVisible();
  });

  test('Get Pricing button is visible', async ({ page, home }) => {
    await home.goto('/#contact');
    await expect(
      page.getByText('Get Pricing', { exact: false }).first()
    ).toBeVisible();
  });

  test('Book Meeting button is visible', async ({ page, home }) => {
    await home.goto('/#contact');
    await expect(
      page.getByText('Book Meeting', { exact: false }).first()
    ).toBeVisible();
  });

  test('Get Pricing button is clickable', async ({ page, home }) => {
    await home.goto('/#contact');
    const btn = page.getByText('Get Pricing', { exact: false }).first();
    await expect(btn).toBeEnabled();
  });

  test('Book Meeting button is clickable', async ({ page, home }) => {
    await home.goto('/#contact');
    const btn = page.getByText('Book Meeting', { exact: false }).first();
    await expect(btn).toBeEnabled();
  });
});
