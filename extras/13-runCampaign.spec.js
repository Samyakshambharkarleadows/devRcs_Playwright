const { test, expect } = require('@playwright/test')
const { time } = require('console');
const { ClientRequest } = require('http');
const { waitForDebugger } = require('inspector')
const { postMessageToThread } = require('worker_threads')

test('Launch Application', async ({ page }) => {

  await page.goto('https://qarcs.pinlab.in/auth/login')

  // test.setTimeout(0); // disables timeout

  // Login
  // await page.locator("xpath=//*[@id='mui-1']").fill("vinoda.khatri@pinnacle.in")
  // await page.locator("css=#outlined-adornment-password").fill("PinnacleRCS@2024")
    await page.getByRole('textbox', { name: 'Username'}).fill(process.env.ORG_ADMIN_USERNAME);
    await page.getByRole('textbox', { name: 'Password'}).fill(process.env.ORG_ADMIN_PASSWORD);
  await page.getByRole('button', { name: 'Sign in' }).click();

  // Click on RCS Management
  await page.getByRole('button', { name: 'RCS Management' }).click();
  await page.getByRole('link', { name: 'Campaigns' }).click();

  // Click on Three Dots to open Run campaign component
  await page.getByTestId('MoreVertIcon').nth(0).click();

  // Create Campaign
  await page.getByTitle('Run Campaign').click();

  // Run Campaign
  await page.getByRole('button', { name: 'sent'}).click();

  // Take screenshot
  await page.waitForTimeout(3000);
  await page.screenshot({ path: 'screenshots/success_upload.png', fullPage: true });

});


