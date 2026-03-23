import { test, expect } from '../fixtures/test-fixture';
import { randomCompany, randomEmail, randomMessage, randomName } from '../utils/random-data';
import { formServiceOptions } from '../utils/site-data';

test.describe('CTA / Schedule form', () => {
  test('service select contains expected options (data-driven)', async ({ contact }) => {
    await contact.open();
    for (const option of formServiceOptions) {
      await contact.expectServiceOptionPresent(option);
    }
  });

  test('contact form can be filled and submitted', async ({ contact, page }) => {
    await contact.open();
    await contact.fillForm({
      fullName: randomName(),
      email: randomEmail(),
      company: randomCompany(),
      message: randomMessage()
    });
    await contact.selectService(formServiceOptions[0]);
    await contact.submit();
    await page.waitForTimeout(3000);

    const sent = page.getByText(/message.*sent|thank you|success/i).first();
    const formCleared = (await page.getByRole('textbox', { name: 'Full Name' }).inputValue()) === '';
    expect(
      await sent.isVisible() || formCleared
    ).toBeTruthy();
  });
});
