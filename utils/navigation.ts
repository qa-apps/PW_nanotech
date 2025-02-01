import { expect, type Page } from '@playwright/test';

export async function clickAndAssertNavigated(
  page: Page,
  clickAction: () => Promise<unknown>,
  options: { expectedUrlPart?: string; expectedText?: string }
) {
  const currentUrl = page.url();
  await clickAction();

  if (options.expectedUrlPart) {
    await expect(page).toHaveURL(new RegExp(options.expectedUrlPart.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
  } else {
    await expect(page).not.toHaveURL(currentUrl);
  }

  if (options.expectedText) {
    await expect(page.getByText(options.expectedText, { exact: false }).first()).toBeVisible();
  }
}
