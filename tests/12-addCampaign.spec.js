const { test, expect } = require('@playwright/test')
const { time } = require('console')
const { waitForDebugger } = require('inspector')
const { postMessageToThread } = require('worker_threads')
const { default: testState } = require('../testState/state');

// Now take a current timestamp for uniqueness.
const timestamp = Date.now().toString().split(-6);
testState["campaignName"] = `Samyak_${timestamp}_QA`



test('Launch Application', async ({ page }) => {

  await page.goto('/auth/login')
  // test.setTimeout(0); // disables timeout

  // await page.locator("xpath=//*[@id='mui-1']").fill("vinoda.khatri@pinnacle.in")
  // await page.locator("css=#outlined-adornment-password").fill("PinnacleRCS@2024")

  await page.getByRole('textbox', { name: 'Username' }).fill(process.env.ORG_ADMIN_USERNAME);
  await page.getByRole('textbox', { name: 'Password' }).fill(process.env.ORG_ADMIN_PASSWORD);

  await page.getByRole('button', { name: 'Sign in' }).click();

  // Click on RCS Management
  await page.getByRole('button', { name: 'RCS Management' }).click();
  await page.getByRole('link', { name: 'Campaigns' }).click();

  // Click on Add New Bot button to open Form.
  await page.getByRole('button', { name: 'Add New Campaign' }).click();


  // Now filling form of Add New BOT == IDEAL PASSING CASES 
  const campaignName = testState.campaignName;

  // Enter Campaign Name
  await page.locator('[name="campaignName"]').fill(campaignName);

  // Select Bot
  await page.getByRole('combobox', { name: 'Select Bot' }).click();
  await page.getByRole('heading', { name: "Pinnacle's RCS Bot" }).click();

  // Select Template
  await page.locator('xpath=//*[@id="select-template-label"]').nth(1).click();
  await page.getByPlaceholder('Search templates').fill('testTemplate');
  await page.getByRole('heading', { name: 'testTemplate' }).click();

  // Select Test message
  // await page.getByPlaceholder('Select Number').click();
  await page.locator('xpath=//*[@id="select-template-label"]').nth(3).click();
  await page.getByRole('option', { name: '+919049474610' }).click();

  // Send test message
  await page.getByRole('button', { name: 'Send Test Message' }).click();
  await page.waitForTimeout(3000);

  // Click upload section (if required)
  await page.getByRole('button', { name: 'Upload CSV' }).click();

  // // Upload CSV directlyy
  await page.locator('input[type="file"]').setInputFiles('assets/numbers.csv');
  await page.getByRole('button', { name: 'Upload CSV' }).click();

  // Create Campaign
  await page.locator('button', { hasText: 'Create Campaign' }).click();

  // Take screenshot
  await page.waitForTimeout(3000);
  await page.screenshot({ path: 'screenshots/success_upload.png', fullPage: true });

});