import { test, expect } from '../fixtures/test-fixture';
import { FAQPage } from '../pages/faq.page';

test.describe('FAQ Section', () => {
  test.beforeEach(async ({ home }) => {
    await home.goto('/');
  });

  test('FAQ heading is visible', async ({ page, home }) => {
    const faq = new FAQPage(page);
    await faq.scrollToFAQ();
  });

  test('all FAQ questions are visible', async ({ page, home }) => {
    const faq = new FAQPage(page);
    await faq.scrollToFAQ();
    await faq.expectAllQuestionsVisible();
  });

  test('clicking Agentic AI question reveals answer', async ({ page, home }) => {
    const faq = new FAQPage(page);
    await faq.scrollToFAQ();
    await faq.clickQuestion('What is Agentic AI');
    await faq.expectAnswerVisible('autonomous agents that can reason');
  });

  test('clicking ROI question reveals answer', async ({ page, home }) => {
    const faq = new FAQPage(page);
    await faq.scrollToFAQ();
    await faq.clickQuestion('What ROI can I expect');
    await faq.expectAnswerVisible('40-70% cost reduction');
  });

  test('clicking implementation timeline question reveals answer', async ({ page, home }) => {
    const faq = new FAQPage(page);
    await faq.scrollToFAQ();
    await faq.clickQuestion('How long does it take');
    await faq.expectAnswerVisible('2-8 weeks');
  });

  test('clicking data security question reveals answer', async ({ page, home }) => {
    const faq = new FAQPage(page);
    await faq.scrollToFAQ();
    await faq.clickQuestion('Is my data secure');
    await faq.expectAnswerVisible('enterprise-grade security');
  });
});
