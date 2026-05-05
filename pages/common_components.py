from playwright.sync_api import Page, expect, Locator
from typing import Literal

ThemeOption = Literal['Light', 'Dark', 'Aurora Blue', 'Glass Dawn']

class CommonComponents:
    def __init__(self, page: Page):
        self.page = page

    # Header / Navigation
    def open_dropdown(self, menu_label: str):
        link = self.page.locator('nav').get_by_role('link', name=menu_label).first
        expect(link).to_be_visible()
        link.hover()

    def click_nav_link(self, label: str):
        self.page.locator('nav').get_by_role('link', name=label).first.click()

    # Footer
    def click_footer_link(self, label: str):
        link = self.page.locator('footer').get_by_role('link', name=label, exact=True)
        expect(link).to_be_visible()
        link.click()

    # Theme Switcher
    def select_theme(self, option: ThemeOption):
        select = self.page.get_by_label('Select background theme')
        expect(select).to_be_visible()
        select.select_option(option)

    def verify_theme_options(self, themes: list):
        select = self.page.get_by_label('Select background theme')
        for theme in themes:
            expect(select.locator('option', has_text=theme)).to_be_attached()
