const { test, expect } = require('@playwright/test')
const { time } = require('console')
const { waitForDebugger } = require('inspector')
const { postMessageToThread } = require('worker_threads')

test('Launch Application', async ({ page }) => {
  test.setTimeout(0); // disables timeout

  await page.goto('https://qarcs.pinlab.in/auth/login')

  await page.locator("xpath=//*[@id='mui-1']").fill("admin@pinnacle.in")
  await page.locator("css=#outlined-adornment-password").fill("1234567890")
  await page.getByRole('button', { name: 'Sign in' }).click();

  // Click on RCS Management
  await page.getByRole('button', { name: 'RCS Management' }).click();
  await page.getByRole('link', { name: 'Templates' }).click();

  // Click on Add New Bot button to open Form.
  await page.getByRole('button', { name: 'Add New Template' }).click();

  // Select BOT
  await page.locator('div[role="combobox"][id="botType-label"]').click();
  await page.locator("li[role='option']", { hasText: "Pinnacle's Campaign Bot" }).click();

  // Now take a current timestamp for uniqueness.
  const timestamp = Date.now().toString().slice(-6); // Slice last 6 diguits

  // Now filling form of Add New BOT == IDEAL PASSING CASES 
  const templateName = `Carousel${timestamp}QA`;
  await page.getByRole('textbox', { name: 'Template Name' }).fill(templateName)

  // Select Template Type
  // await page.locator('xpath=//*[@id="templatetype-label"]').nth(0).click();
  await page.locator('div[role="combobox"][id="templatetype-label"]').click();
  await page.locator("li[role='option']", { hasText: 'Rich Card Carousel' }).click();


  // ==============================================FIRST CARD ====================================================
  // Upload Image
  const fileInput1 = page.locator('input[type="file"]');
  // Click the upload area to reveal chooser
  // await page.waitForEvent(2000);
  await page.getByRole('button', {name: "Choose"}).click();
  // Set file directly
  await fileInput1.setInputFiles('assets/logo.png');
  // Wait for crop box to appear
  await page.locator('.ReactCrop__crop-selection[role="group"]').click();
  // Confirm crop
  await page.waitForTimeout(2000);
  await page.getByRole('button', { name: 'Select', exact: true  }).click();

  // Enter Card Title
  await page.getByRole('textbox', { name: 'Card Title' }).fill('Test Title')

  // Enter Card Description
  // await page.getByPlaceholder

  await page.getByRole('textbox', { name: 'Enter card description here' }).fill("Approve this message It is for testing - Created by Sammyak QA - Leadows")
  // Add Button (1)
  await page.getByRole('button', { name: "Add Button" }).click();
  await page.locator('textarea[name="suggestionText"]').fill("Happy Testing"); //----------------USED WHEN NO NAME IS GIVEN

  // ==============================================SECOND CARD ====================================================
  // Click on 2nd Card
  await page.getByRole('tab', {name: 'Card 2'}).click();

  // Upload Image
  const fileInput2 = page.locator('input[type="file"]');
  // Click the upload area to reveal chooser
  await page.getByRole('button', {name: "Choose"}).click();
  // Set file directly
  await fileInput2.setInputFiles('assets/logo.png');
  // Wait for crop box to appear
  await page.locator('.ReactCrop__crop-selection[role="group"]').click();
  // Confirm crop
  await page.waitForTimeout(2000);
  await page.getByRole('button', { name: 'Select', exact: true  }).click();

  // Enter Card Title
  await page.getByRole('textbox', { name: 'Card Title' }).fill('Test Title')

  // Enter Card Description
  await page.getByRole('textbox', { name: 'Enter card description here' }).fill("Approve this message It is for testing - Created by Sammyak QA - Leadows")

  // Add Button (1)
  await page.getByRole('button', { name: "Add Button" }).click();
  await page.locator('textarea[name="suggestionText"]').nth(1).fill("Happy Testing"); //----------------USED WHEN NO NAME IS GIVEN

  // Submit the Form
  await page.locator('button', { hasText: 'Create Template' }).click();

  // Take screenshot
  await page.waitForTimeout(5000);
  await page.screenshot({ path: 'screenshots/success_upload.png', fullPage: true });

});