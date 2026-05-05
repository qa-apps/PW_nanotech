import random
import time

def random_int(max_val: int = 10_000) -> int:
    return random.randint(0, max_val - 1)

def random_name(prefix: str = 'Test User') -> str:
    return f"{prefix} {random_int()}"

def random_email(domain: str = 'example.com') -> str:
    return f"test_{int(time.time() * 1000)}_{random_int()}@{domain}"

def random_company(prefix: str = 'QA Company') -> str:
    return f"{prefix} {random_int()}"

def random_message() -> str:
    return f"Automated Playwright message {int(time.time() * 1000)}_{random_int()}"
