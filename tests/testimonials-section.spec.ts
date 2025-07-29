import { test, expect } from '../fixtures/test-fixture';
import { TestimonialsPage } from '../pages/testimonials.page';

test.describe('Client Testimonials Section', () => {
  test.beforeEach(async ({ home }) => {
    await home.goto('/');
  });

  test('testimonials section heading is visible', async ({ page, home }) => {
    const testimonials = new TestimonialsPage(page);
    await testimonials.scrollToTestimonials();
  });

  test('all client testimonial cards are present', async ({ page, home }) => {
    const testimonials = new TestimonialsPage(page);
    await testimonials.scrollToTestimonials();
    await testimonials.expectAllTestimonialsPresent();
  });

  test('Sarah C. testimonial contains document processing quote', async ({ page, home }) => {
    const testimonials = new TestimonialsPage(page);
    await testimonials.scrollToTestimonials();
    await testimonials.expectTestimonialContainsQuote('Sarah C.', 'document processing');
  });

  test('Elena R. testimonial mentions supply chain', async ({ page, home }) => {
    const testimonials = new TestimonialsPage(page);
    await testimonials.scrollToTestimonials();
    await testimonials.expectTestimonialContainsQuote('Elena R.', 'supply chain');
  });
});
