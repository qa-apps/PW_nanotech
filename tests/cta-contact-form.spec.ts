import { test } from '../fixtures/test-fixture';
import { randomCompany, randomEmail, randomMessage, randomName } from '../utils/random-data';
import { formServiceOptions } from '../utils/site-data';

test.describe('CTA / Schedule form', () => {
  test('service select contains expected options (data-driven)', async ({ contact }) => {
    await contact.open();
    for (const option of formServiceOptions) {
      await contact.expectServiceOptionPresent(option);
    }
  });

  test('contact form submits and success toast appears', async ({ contact }) => {
    await contact.open();
    await contact.fillForm({
      fullName: randomName(),
      email: randomEmail(),
      company: randomCompany(),
      message: randomMessage()
    });
    await contact.selectService(formServiceOptions[0]);
    await contact.submit();
    await contact.expectSuccessToast();
  });
});
