const { test, expect } = require('@playwright/test')
const { time } = require('console')
const { waitForDebugger } = require('inspector')
const { postMessageToThread } = require('worker_threads')

test('Launch Application', async ({ page }) => {

  await page.goto('https://devrcs.pinnacle.in/auth/login')

  await page.locator("xpath=//*[@id='mui-1']").fill("admin@pinnacle.in")
  await page.locator("css=#outlined-adornment-password").fill("1234567890")
  await page.getByRole('button', { name: 'Sign in' }).click();

  // Click on RCS Management
  await page.getByRole('button', { name: 'RCS Management' }).click();
  await page.getByRole('link', { name: 'Bots' }).click();

  // Click on Add New Bot button to open Form.
  await page.getByRole('button', { name: 'Add New Bot' }).click();

  // Now take a current timestamp for uniqueness.
  const timestamp = Date.now();

  // Now filling form of Add New BOT == IDEAL PASSING CASES 
  const uniqueClientName = `SamyakQA_${timestamp}`;

  // Bot Name
  await page.locator('[name="botName"]').fill(uniqueClientName);

  // Select Brand
  await page.locator('div[role="combobox"][id="Select Brand"]').click();
  await page.getByPlaceholder('Search brand').fill('Pinnacle Teleservices 33 Pvt. Ltd.');
  await page.locator('li[role="option"][data-value="Pinnacle Teleservices 33 Pvt. Ltd."]').click();

  // Upload Bot Logo
  const [fileChooserLogo] = await Promise.all([
    page.waitForEvent('filechooser'),
    page.getByRole('button', { name: 'Choose' }).first().click(),
  ]);
  await fileChooserLogo.setFiles('assets/logo.png');

  // Wait for crop popup and select
  await page.waitForSelector('.ReactCrop__crop-selection[role="group"]', { timeout: 10000 });
  await page.locator('.ReactCrop__crop-selection[role="group"]').click();
  await page.waitForSelector('button:has-text("Select")', { state: 'visible', timeout: 10000 });
  await page.locator('button:has-text("Select")').click();

  // Wait for popup to close completely before next upload
  await page.waitForSelector('.ReactCrop__crop-selection[role="group"]', { state: 'detached', timeout: 10000 });
  await page.waitForTimeout(1500); // give DOM time to re-render cleanly

  // Upload Banner Image 
  const allInputs = await page.locator('input[type="file"]').all();
  if (allInputs.length < 2) {
    throw new Error('Second file input not found!');
  }

  // Set banner image file directly
  await allInputs[1].setInputFiles('assets/logo.png');

  // Wait for 2nd crop popup and select
  await page.waitForSelector('.ReactCrop__crop-selection[role="group"]', { timeout: 10000 });
  await page.locator('.ReactCrop__crop-selection[role="group"]').click();
  await page.waitForSelector('button:has-text("Select")', { state: 'visible', timeout: 10000 });
  await page.locator('button:has-text("Select")').click();

  // Wait for 2nd popup to disappear
  await page.waitForSelector('.ReactCrop__crop-selection[role="group"]', { state: 'detached', timeout: 10000 });

  // Short message
  await page.locator('[name="shortDescription"]').fill('Hi this is Automated test for Regression testing, Created by Samyak - QA Engineer');
  await page.locator('[name="termsofUseUrl"]').fill('https://leadows.com');
  await page.locator('[name="privacyPolicyUrl"]').fill('https://leadows.com');
  await page.locator('[name="languagesSupported"]').fill('English');

  // Click on Checkbox
  await page.getByRole('checkbox').click();
  await page.waitForTimeout(4000);

  // Submit the Form
  await page.locator('button', { hasText: 'Create' }).click();

  // Take screenshot
  await page.waitForTimeout(9000);
  await page.screenshot({ path: 'screenshots/success_upload.png', fullPage: true });

});