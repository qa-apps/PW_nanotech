import pytest
from playwright.sync_api import Page
from pages.landing_sections import LandingSections
from pages.user_auth import UserAuth
from pages.common_components import CommonComponents
from pages.interactive_tools import InteractiveTools

@pytest.fixture
def landing(page: Page) -> LandingSections:
    return LandingSections(page)

@pytest.fixture
def auth(page: Page) -> UserAuth:
    return UserAuth(page)

@pytest.fixture
def common(page: Page) -> CommonComponents:
    return CommonComponents(page)

@pytest.fixture
def tools(page: Page) -> InteractiveTools:
    return InteractiveTools(page)

# For backward compatibility if needed during migration
@pytest.fixture
def home(landing: LandingSections) -> LandingSections:
    return landing

@pytest.fixture
def hero(landing: LandingSections) -> LandingSections:
    return landing

@pytest.fixture
def metrics(landing: LandingSections) -> LandingSections:
    return landing

@pytest.fixture
def testimonials(landing: LandingSections) -> LandingSections:
    return landing

@pytest.fixture
def contact(auth: UserAuth) -> UserAuth:
    return auth

@pytest.fixture
def login(auth: UserAuth) -> UserAuth:
    return auth

@pytest.fixture
def header(common: CommonComponents) -> CommonComponents:
    return common

@pytest.fixture
def theme(common: CommonComponents) -> CommonComponents:
    return common

@pytest.fixture
def aiWidget(tools: InteractiveTools) -> InteractiveTools:
    return tools

@pytest.fixture
def roi(tools: InteractiveTools) -> InteractiveTools:
    return tools

@pytest.fixture
def faq(tools: InteractiveTools) -> InteractiveTools:
    return tools

@pytest.fixture(autouse=True)
def set_default_timeouts(page: Page):
    page.set_default_timeout(10000)
    page.set_default_navigation_timeout(10000)
    yield
