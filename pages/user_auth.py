import re
from playwright.sync_api import Page, expect
from typing import TypedDict, Literal

class ContactPayload(TypedDict):
    fullName: str
    email: str
    company: str
    message: str

TabName = Literal['Messages', 'Orders', 'Notes']

class UserAuth:
    def __init__(self, page: Page):
        self.page = page

    # Contact Form
    def open_contact_form(self):
        self.page.goto('/#contact', wait_until='domcontentloaded')

    def fill_contact_form(self, payload: ContactPayload):
        self.page.get_by_role('textbox', name='Full Name').fill(payload['fullName'])
        self.page.get_by_role('textbox', name='Email Address').fill(payload['email'])
        self.page.get_by_role('textbox', name='Company').fill(payload['company'])
        self.page.locator('textarea#message').fill(payload['message'])

    def select_service(self, service_name: str):
        self.page.get_by_label('Service Interest').select_option(service_name)

    def submit_contact_form(self):
        submit_btn = self.page.get_by_role('button', name='Send Message', exact=True)
        submit_btn.click(force=True)

    # Login
    def open_login_modal(self):
        self.page.get_by_role('button', name=re.compile(r'Login', re.IGNORECASE)).click()

    def fill_login_form(self, email: str, password: str):
        form = self.page.locator('#login-form')
        form.locator('input[type="email"], input[placeholder*="Email"]').first.fill(email)
        form.locator('input[type="password"]').first.fill(password)

    def click_login(self):
        self.page.locator('#login-form button.auth-submit').click()

    # Dashboard
    def expect_dashboard_visible(self):
        expect(self.page.get_by_text('My Dashboard', exact=False)).to_be_visible()

    def click_tab(self, tab_name: TabName):
        self.page.get_by_role('button', name=tab_name).or_(
            self.page.get_by_text(tab_name, exact=True)
        ).first.click()

    def logout(self):
        self.page.get_by_role('button', name=re.compile(r'Logout', re.IGNORECASE)).click()
