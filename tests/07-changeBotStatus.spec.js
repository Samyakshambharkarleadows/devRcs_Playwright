const { test, expect } = require('@playwright/test')
const { time } = require('console')
const { waitForDebugger } = require('inspector')
const { postMessageToThread } = require('worker_threads')

test('Launch Application', async ({ page }) => {

  // await page.goto('https://qarcs.pinlab.in/auth/login')
  await page.goto('/auth/login')

  // await page.locator("xpath=//*[@id='mui-1']").fill("admin@pinnacle.in")
  // await page.locator("css=#outlined-adornment-password").fill("1234567890")

  await page.getByRole('textbox', { name: 'Username'}).fill(process.env.RESELLER_ADMIN_USERNAME);
  await page.getByRole('textbox', { name: 'Password'}).fill(process.env.RESELLER_ADMIN_PASSWORD);
  await page.getByRole('button', { name: 'Sign in' }).click();

  // Click on RCS Management
  await page.getByRole('button', { name: 'RCS Management' }).click();
  await page.getByRole('link', { name: 'Bots' }).click();

  // Click on Three dots for updating
  await page.getByTestId('MoreVertIcon').nth(0).click(); // first
  await page.getByRole('menuitem', { name: 'Change status to' }).click();
  await page.waitForTimeout(2000);

  await page.getByRole('combobox', { name: "Change Status to"}).click();
  await page.locator('li[role="option"][data-value="launched"]').click();


  await page.getByRole("button", { name: "Update"}).click();


  // // Now take a current timestamp for uniqueness.
  // const timestamp = Date.now();

  // // Now filling form of Add New BOT == IDEAL PASSING CASES 
  // const uniqueKey = `TEST${timestamp}`;

  // // Client ID
  // await page.locator('[name="rbmClientId"]').fill(uniqueKey);
  // await page.locator('[name="rbmClientSecret"]').fill(uniqueKey);

  // // Submit the Form
  // await page.locator('button', { hasText: 'Save' }).click();

  // Take screenshot
  await page.waitForTimeout(4000);
  await page.screenshot({ path: 'screenshots/success_upload.png', fullPage: true });

});