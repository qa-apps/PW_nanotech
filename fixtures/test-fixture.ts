import { test as base } from '@playwright/test';
import { AIWidgetPage } from '../pages/ai-widget.page';
import { ComboAICardsPage } from '../pages/combo-ai.page';
import { ContactPage } from '../pages/contact.page';
import { FooterPage } from '../pages/footer.page';
import { HeaderPage } from '../pages/header.page';
import { HomePage } from '../pages/home.page';
import { ThemePage } from '../pages/theme.page';

type AppFixtures = {
  home: HomePage;
  header: HeaderPage;
  footer: FooterPage;
  contact: ContactPage;
  combo: ComboAICardsPage;
  aiWidget: AIWidgetPage;
  theme: ThemePage;
};

export const test = base.extend<AppFixtures>({
  home: async ({ page }, use) => use(new HomePage(page)),
  header: async ({ page }, use) => use(new HeaderPage(page)),
  footer: async ({ page }, use) => use(new FooterPage(page)),
  contact: async ({ page }, use) => use(new ContactPage(page)),
  combo: async ({ page }, use) => use(new ComboAICardsPage(page)),
  aiWidget: async ({ page }, use) => use(new AIWidgetPage(page)),
  theme: async ({ page }, use) => use(new ThemePage(page))
});

export { expect } from '@playwright/test';
