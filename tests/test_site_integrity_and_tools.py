import time
import pytest
from playwright.sync_api import Page, expect
from pages.landing_sections import LandingSections
from pages.interactive_tools import InteractiveTools
from utils.assertions import expect_images_loaded
from utils.site_data import key_content_texts

class TestSiteIntegrity:
    def test_performance_smoke(self, page: Page):
        start = time.time()
        page.goto('/', wait_until='domcontentloaded')
        assert (time.time() - start) < 10.0

    @pytest.fixture
    def on_home(self, landing: LandingSections):
        landing.goto_home()

    @pytest.mark.parametrize("text", key_content_texts[:5])
    def test_key_content_visible(self, page: Page, on_home, text: str):
        expect(page.get_by_text(text, exact=False).first).to_be_visible()

    def test_images_not_broken(self, page: Page, on_home):
        expect_images_loaded(page)

class TestInteractiveTools:
    @pytest.fixture(autouse=True)
    def on_home(self, landing: LandingSections):
        landing.goto_home()

    def test_ai_widget_interaction(self, tools: InteractiveTools):
        tools.open_chat_window()
        tools.click_mode('General')
        tools.expect_send_button_visible()

    def test_roi_calculator_flow(self, page: Page, tools: InteractiveTools):
        tools.scroll_to_calculator()
        tools.fill_manual_hours('200')
        tools.fill_hourly_cost('50')
        tools.click_calculate()
        expect(page.locator('[class*="result"], [class*="summary"]').first).to_be_visible(timeout=10_000)

    @pytest.mark.parametrize("question,answer", [
        ('What is Agentic AI', 'autonomous agents that can reason'),
        ('What ROI can I expect', '40-70% cost reduction')
    ])
    def test_faq_interaction(self, tools: InteractiveTools, question, answer):
        tools.scroll_to_faq()
        tools.click_question(question)
        tools.expect_answer_visible(answer)
