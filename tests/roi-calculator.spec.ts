import { test, expect } from '../fixtures/test-fixture';
import { ROICalculatorPage } from '../pages/roi-calculator.page';

test.describe('ROI Calculator', () => {
  test('calculator section is visible on page', async ({ page, home }) => {
    await home.goto('/');
    const roi = new ROICalculatorPage(page);
    await roi.scrollToCalculator();
  });

  test('calculate button produces results', async ({ page, home }) => {
    await home.goto('/');
    const roi = new ROICalculatorPage(page);
    await roi.scrollToCalculator();
    await roi.fillManualHours('160');
    await roi.fillHourlyCost('50');
    await roi.fillAutomationCoverage('70');
    await roi.fillMonthlySoftwareCost('500');
    await roi.fillSetupCost('5000');
    await roi.clickCalculate();
    await roi.expectResultsVisible();
  });

  test('download ROI summary button is visible after calculation', async ({ page, home }) => {
    await home.goto('/');
    const roi = new ROICalculatorPage(page);
    await roi.scrollToCalculator();
    await roi.fillManualHours('100');
    await roi.fillHourlyCost('40');
    await roi.fillAutomationCoverage('60');
    await roi.fillMonthlySoftwareCost('300');
    await roi.fillSetupCost('3000');
    await roi.clickCalculate();
    await roi.expectDownloadButtonVisible();
  });

  test('Get Custom Automation Quote CTA is visible', async ({ page, home }) => {
    await home.goto('/');
    await expect(
      page.getByText('Get Custom Automation Quote', { exact: false }).first()
    ).toBeVisible();
  });
});
