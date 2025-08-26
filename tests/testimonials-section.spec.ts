import { test, expect } from '../fixtures/test-fixture';
import { TestimonialsPage } from '../pages/testimonials.page';

test.describe('Client Testimonials Section', () => {
  test.beforeEach(async ({ home }) => {
    await home.goto('/');
  });

  test('testimonials section heading is visible', async ({ page }) => {
    const testimonials = new TestimonialsPage(page);
    await testimonials.scrollToTestimonials();
  });

  test('carousel controls Previous and Next are visible', async ({ page }) => {
    const testimonials = new TestimonialsPage(page);
    await testimonials.scrollToTestimonials();
    await testimonials.expectCarouselControlsVisible();
  });

  test('clicking Next changes the visible testimonial', async ({ page }) => {
    const testimonials = new TestimonialsPage(page);
    await testimonials.scrollToTestimonials();
    await testimonials.clickNext();
    await testimonials.expectTestimonialVisible();
  });

  test('clicking Previous after Next shows a testimonial', async ({ page }) => {
    const testimonials = new TestimonialsPage(page);
    await testimonials.scrollToTestimonials();
    await testimonials.clickNext();
    await testimonials.clickPrevious();
    await testimonials.expectTestimonialVisible();
  });
});
