import { expect, type Page } from '@playwright/test';

export class FAQPage {
  constructor(private readonly page: Page) {}

  async scrollToFAQ() {
    const heading = this.page.getByRole('heading', { name: 'Got Questions? We Have Answers' });
    await heading.scrollIntoViewIfNeeded();
    await expect(heading).toBeVisible();
  }

  async clickQuestion(questionText: string) {
    const question = this.page.getByRole('button', { name: new RegExp(questionText, 'i') });
    await expect(question).toBeVisible();
    await question.click();
  }

  async expectAnswerVisible(answerText: string) {
    await expect(
      this.page.getByText(answerText, { exact: false }).first()
    ).toBeVisible();
  }

  async expectAllQuestionsVisible() {
    const questions = [
      'What is Agentic AI',
      'How long does it take',
      'What ROI can I expect',
      'Do you work with existing systems',
      'What technologies and frameworks',
      'Is my data secure'
    ];

    for (const q of questions) {
      await expect(
        this.page.getByRole('button', { name: new RegExp(q, 'i') })
      ).toBeVisible();
    }
  }
}
