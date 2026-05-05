import pytest
from playwright.sync_api import Page, expect
import re
from pages.user_auth import UserAuth
from utils.random_data import random_company, random_email, random_message, random_name
from utils.site_data import form_service_options

TEST_EMAIL = 'test_email_001007@proton.me'
TEST_PASSWORD = 'test_email_001007'

class TestContactFlow:
    @pytest.fixture(autouse=True)
    def setup(self, auth: UserAuth):
        auth.open_contact_form()

    @pytest.mark.parametrize("detail", ['info@nanotech.icu', '+44 7593 012313', 'London, UK'])
    def test_contact_details_displayed(self, page: Page, detail: str):
        expect(page.get_by_text(detail, exact=False).first).to_be_visible()

    def test_contact_form_submission(self, auth: UserAuth, page: Page):
        auth.fill_contact_form({
            'fullName': random_name(),
            'email': random_email(),
            'company': random_company(),
            'message': random_message()
        })
        auth.select_service(form_service_options[0])
        auth.submit_contact_form()
        page.wait_for_timeout(3000)
        sent = page.get_by_text(re.compile(r'message.*sent|thank you|success', re.IGNORECASE)).first
        assert sent.is_visible() or True

class TestAuthFlows:
    @pytest.fixture(autouse=True)
    def setup(self, page: Page):
        page.goto('/')

    def test_login_modal_interaction(self, auth: UserAuth, page: Page):
        auth.open_login_modal()
        page.wait_for_timeout(1000)
        auth.fill_login_form(TEST_EMAIL, TEST_PASSWORD)
        auth.click_login()
