import { expect, type Page } from '@playwright/test';

export class TestimonialsPage {
  constructor(private readonly page: Page) {}

  async scrollToTestimonials() {
    const heading = this.page.getByText('What Our Clients Say', { exact: false }).first();
    await heading.scrollIntoViewIfNeeded();
    await expect(heading).toBeVisible();
  }

  async expectTestimonialCardVisible(clientName: string) {
    await expect(
      this.page.getByText(clientName, { exact: false }).first()
    ).toBeVisible();
  }

  async expectAllTestimonialsPresent() {
    const clients = [
      'Sarah C.',
      'Marcus W.',
      'Elena R.',
      'James T.',
      'Priya S.',
      'David O.',
      'Katarina N.',
      'Robert K.'
    ];

    for (const client of clients) {
      await expect(
        this.page.getByText(client, { exact: false }).first()
      ).toBeVisible();
    }
  }

  async expectTestimonialContainsQuote(clientName: string, quoteFragment: string) {
    const card = this.page.locator('[class*="testimonial"], [class*="review"]')
      .filter({ hasText: clientName }).first();
    await expect(card.getByText(quoteFragment, { exact: false })).toBeVisible();
  }
}
