import { expect, type Page } from '@playwright/test';

export class TestimonialsPage {
  constructor(private readonly page: Page) {}

  async scrollToTestimonials() {
    const heading = this.page.getByRole('heading', { name: 'What Our Clients Say' });
    await heading.scrollIntoViewIfNeeded();
    await expect(heading).toBeVisible();
  }

  async expectCarouselControlsVisible() {
    await expect(this.page.getByRole('button', { name: 'Previous' })).toBeVisible();
    await expect(this.page.getByRole('button', { name: 'Next' })).toBeVisible();
  }

  async clickNext() {
    await this.page.getByRole('button', { name: 'Next' }).click();
  }

  async clickPrevious() {
    await this.page.getByRole('button', { name: 'Previous' }).click();
  }

  async expectTestimonialVisible() {
    const quote = this.page.locator('[class*="testimonial"], [class*="review"], [class*="slide"]')
      .first();
    await expect(quote).toBeVisible();
  }
}
