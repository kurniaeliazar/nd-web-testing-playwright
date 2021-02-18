import { chromium } from "playwright";

let page: any;
let browser: any;

describe("Sandbox", () => {
  beforeAll(async () => {
    browser = process.env.GITHUB_ACTIONS
      ? await chromium.launch()
      : await chromium.launch({ headless: false });
    page = await browser.newPage();

    await page
      .goto("https://beta.niceday.app/auth/login", {
        waitUntil: "networkidle0",
      })
      // tslint:disable-next-line:no-empty
      .catch(() => {});
  });

  afterAll(() => {
    if (!page.isClosed()) {
      browser.close();
    }
  });

  test("should be on the sandbox", async () => {
    await page.fill('input[name="email"]', 'kurnia');
    await page.fill('input[name="password"]', 'test 12345');
    await page.click('text=Login');
    const content = await page.textContent('text=Invalid username or password');
    expect(content).toBeTruthy();
  });
});