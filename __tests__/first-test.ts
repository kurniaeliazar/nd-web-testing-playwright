import { chromium } from "playwright";

(async () => {
  const browser = await chromium.launch({ headless: false, slowMo: 50 });
  const page = await browser.newPage();
  await page.goto('https://beta.niceday.app/auth/login');
  await page.fill('input[name="email"]', 'kurnia');
  await page.fill('input[name="password"]', 'test 12345');
  await page.click('text=Login');
  const content = await page.textContent('text=Invalid username or password');
  expect(content).toBeTruthy();
  await browser.close();
})();