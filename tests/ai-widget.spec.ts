import { test } from '../fixtures/test-fixture';

test.describe('AI Widget', () => {
  test.beforeEach(async ({ home }) => {
    await home.goto('/');
  });

  test('chat window opens and mode buttons are clickable', async ({ home, aiWidget }) => {
    await aiWidget.openChatWindow();

    await aiWidget.clickMode('General');
    await aiWidget.clickMode('Code');
    await aiWidget.clickMode('Analyst');
    await aiWidget.clickMode('Research');
    await aiWidget.clickMode('Vision');
  });

  test('simple prompt returns non-empty response without obvious UI errors', async ({ home, aiWidget }) => {
    test.setTimeout(120_000);
    await aiWidget.openChatWindow();
    await aiWidget.clickMode('General');
    await aiWidget.ask('Hi, how are you?');
    await aiWidget.expectNonEmptyResponse();
  });
});
