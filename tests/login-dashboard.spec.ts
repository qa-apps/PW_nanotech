import { test, expect } from '../fixtures/test-fixture';
import { LoginPage } from '../pages/login.page';
import { DashboardPage } from '../pages/dashboard.page';

const TEST_EMAIL = 'test_email_001007@proton.me';
const TEST_PASSWORD = 'test_email_001007';

test.describe('Login and Dashboard', () => {
  test.beforeEach(async ({ home }) => {
    await home.goto('/');
  });

  test('login modal opens and contains email/password fields', async ({ page, home }) => {
    const login = new LoginPage(page);
    await login.openLoginModal();
    await login.expectLoginModalVisible();
  });

  test('user can log in with valid credentials', async ({ page, home }) => {
    const login = new LoginPage(page);
    await login.login(TEST_EMAIL, TEST_PASSWORD);

    const dashboard = new DashboardPage(page);
    await dashboard.expectDashboardVisible();
  });

  test('dashboard tabs Messages, Orders, Notes are clickable', async ({ page, home }) => {
    const login = new LoginPage(page);
    await login.login(TEST_EMAIL, TEST_PASSWORD);

    const dashboard = new DashboardPage(page);
    await dashboard.expectDashboardVisible();

    await dashboard.clickTab('Messages');
    await dashboard.expectTabActive('Messages');

    await dashboard.clickTab('Orders');
    await dashboard.expectTabActive('Orders');

    await dashboard.clickTab('Notes');
    await dashboard.expectTabActive('Notes');
  });

  test('user can write and save notes', async ({ page, home }) => {
    const login = new LoginPage(page);
    await login.login(TEST_EMAIL, TEST_PASSWORD);

    const dashboard = new DashboardPage(page);
    await dashboard.clickTab('Notes');
    await dashboard.fillNotes('Automated test note ' + Date.now());
    await dashboard.saveNotes();
  });

  test('user can logout from dashboard', async ({ page, home }) => {
    const login = new LoginPage(page);
    await login.login(TEST_EMAIL, TEST_PASSWORD);

    const dashboard = new DashboardPage(page);
    await dashboard.expectDashboardVisible();
    await dashboard.clickLogout();
    await dashboard.expectLogoutSuccessful();
  });
});
