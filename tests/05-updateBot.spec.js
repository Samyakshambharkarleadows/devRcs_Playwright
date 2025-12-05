const { test, expect } = require('@playwright/test')
const { time } = require('console')
const { waitForDebugger } = require('inspector')
const { postMessageToThread } = require('worker_threads')

test('Launch Application', async ({ page }) => {

  await page.goto('https://qarcs.pinlab.in/auth/login')

  // await page.locator("xpath=//*[@id='mui-1']").fill("admin@pinnacle.in")
  // await page.locator("css=#outlined-adornment-password").fill("1234567890")
  await page.getByRole('textbox', { name: 'Username'}).fill(process.env.RESELLER_ADMIN_USERNAME);
  await page.getByRole('textbox', { name: 'Password'}).fill(process.env.RESELLER_ADMIN_PASSWORD);
  await page.getByRole('button', { name: 'Sign in' }).click();

  // Click on RCS Management
  await page.getByRole('button', { name: 'RCS Management' }).click();
  await page.getByRole('link', { name: 'Bots' }).click();


  // Click on Three dots for updating
  // await page.locator("xpath=//*[@id='menu-button@690c59a2f9f90403e241c5bf']").click(); //----Not working 
  // await page.getByTestId("MoreVertIcon").click();
  await page.getByTestId('MoreVertIcon').nth(0).click(); // first
  await page.getByTitle('Edit Details').click();
  await page.waitForTimeout(2000);

  // Now take a current timestamp for uniqueness.
  const timestamp = Date.now();

  // Now filling form of Add New BOT == IDEAL PASSING CASES 
  const uniqueClientName = `SamyakQA_${timestamp}_UPD`;

  // Bot Name
  await page.locator('[name="botName"]').fill(uniqueClientName);

  // // Click on Checkbox
  await page.waitForTimeout(2000);

  // // Submit the Form
  await page.locator('button', { hasText: 'Update' }).click();

  // Take screenshot
  await page.waitForTimeout(9000);
  await page.screenshot({ path: 'screenshots/success_upload.png', fullPage: true });

});