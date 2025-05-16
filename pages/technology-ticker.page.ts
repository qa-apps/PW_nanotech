import { expect, type Page } from '@playwright/test';

export class TechnologyTickerPage {
  constructor(private readonly page: Page) {}

  async expectTickerVisible() {
    const tickerItems = [
      'Agentic AI',
      'Large Language Models',
      'Machine Learning',
      'Computer Vision',
      'Big Data',
      'Data Analytics',
      'Robotic Process Automation',
      'Neural Networks',
      'Natural Language Processing',
      'Cloud Computing',
      'Cybersecurity AI',
      'Knowledge Graphs',
      'Generative AI',
      'Multi-Agent Systems',
      'RAG & Search',
      'AI Code Generation'
    ];

    for (const item of tickerItems) {
      await expect(
        this.page.getByText(item, { exact: false }).first()
      ).toBeAttached();
    }
  }

  async expectTickerAnimates() {
    const ticker = this.page.locator('[class*="marquee"], [class*="ticker"], [class*="scroll"]').first();
    if (await ticker.count()) {
      await expect(ticker).toBeVisible();
      const animation = await ticker.evaluate(el => getComputedStyle(el).animation);
      expect(animation).not.toBe('none');
    }
  }
}
