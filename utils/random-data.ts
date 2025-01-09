export function randomInt(max = 10_000): number {
  return Math.floor(Math.random() * max);
}

export function randomName(prefix = 'Test User'): string {
  return `${prefix} ${randomInt()}`;
}

export function randomEmail(domain = 'example.com'): string {
  return `test_${Date.now()}_${randomInt()}@${domain}`;
}

export function randomCompany(prefix = 'QA Company'): string {
  return `${prefix} ${randomInt()}`;
}

export function randomMessage(): string {
  return `Automated Playwright message ${Date.now()}_${randomInt()}`;
}
