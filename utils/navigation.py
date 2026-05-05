import re
from typing import Callable, Optional
from playwright.sync_api import Page, expect

def click_and_assert_navigated(
    page: Page,
    click_action: Callable[[], None],
    expected_url_part: Optional[str] = None,
    expected_text: Optional[str] = None
) -> None:
    current_url = page.url
    click_action()

    if expected_url_part:
        # Escape the string and compile regex
        escaped_part = re.escape(expected_url_part)
        expect(page).to_have_url(re.compile(escaped_part))
    else:
        expect(page).not_to_have_url(current_url)

    if expected_text:
        expect(page.get_by_text(expected_text, exact=False).first).to_be_visible()
