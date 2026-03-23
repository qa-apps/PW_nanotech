import { test, expect } from '../fixtures/test-fixture';

test.describe('AI Widget', () => {
  test.beforeEach(async ({ home }) => {
    await home.goto('/');
  });

  test('chat window opens and mode buttons are clickable', async ({ aiWidget }) => {
    await aiWidget.openChatWindow();
    await aiWidget.clickMode('General');
    await aiWidget.clickMode('Code');
    await aiWidget.clickMode('Analyst');
    await aiWidget.clickMode('Research');
    await aiWidget.clickMode('Vision');
  });

  test('chat input accepts text and send button is clickable', async ({ aiWidget, page }) => {
    await aiWidget.openChatWindow();
    const input = page.locator('#chat-input');
    await expect(input).toBeVisible();
    await expect(input).toBeEditable();
    await input.fill('Hello test');
    expect(await input.inputValue()).toBe('Hello test');
    await aiWidget.expectSendButtonVisible();
  });

  test('AI prompt submission does not crash the widget', async ({ aiWidget, page }) => {
    test.setTimeout(90_000);
    const errors: string[] = [];
    page.on('pageerror', err => errors.push(err.message));

    await aiWidget.openChatWindow();
    await aiWidget.clickMode('General');
    await aiWidget.ask('Hi');
    await page.waitForTimeout(5000);

    expect(errors).toHaveLength(0);
  });
});
