const { test, expect } = require('@playwright/test')
const { time } = require('console')
const { waitForDebugger } = require('inspector')
const { postMessageToThread } = require('worker_threads')

test('Launch Application', async ({ page }) => {
  test.setTimeout(0); // disables timeout

  await page.goto('https://qarcs.pinlab.in/auth/login')

  // await page.locator("xpath=//*[@id='mui-1']").fill("admin@pinnacle.in")
  // await page.locator("css=#outlined-adornment-password").fill("1234567890")

  await page.getByRole('textbox', { name: 'Username'}).fill(process.env.RESELLER_ADMIN_USERNAME);
  await page.getByRole('textbox', { name: 'Password'}).fill(process.env.RESELLER_ADMIN_PASSWORD);
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
  const templateName = `StandAl${timestamp}QA`;
  await page.getByRole('textbox', { name: 'Template Name' }).fill(templateName)

  // Select Template Type
  // await page.locator('xpath=//*[@id="templatetype-label"]').nth(0).click();
  await page.locator('div[role="combobox"][id="templatetype-label"]').click();
  await page.locator("li[role='option']", { hasText: 'Rich Card Stand Alone' }).click();

  // Upload Image
  const fileInput = page.locator('input[type="file"]');
  // Click the upload area to reveal chooser
  await page.getByText('Choose Media').click();
  // Set file directly
  await fileInput.setInputFiles('assets/logo.png');
  // Wait for crop box to appear
  await page.locator('.ReactCrop__crop-selection[role="group"]').click();
  // Confirm crop
  await page.waitForTimeout(3000);
  await page.getByRole('button', { name: 'Select', exact: true  }).click();


  // Enter Card Title
  await page.getByRole('textbox', { name: 'Card Title' }).fill('Test Title')

  // Enter Card Description
  // await page.getByPlaceholder

  await page.getByPlaceholder('Enter card description here').fill("This is testing message, Please Approve this- Created by Samyak (QA - Leadows) ")

  // Add Button (1)
  await page.getByRole('button', { name: "Add Button" }).click();
  await page.locator('textarea[name="suggestionText"]').fill("Happy Testing"); //----------------USED WHEN NO NAME IS GIVEN

  // // Add Button (2) & Select URL Action
  // await page.getByRole('button', { name: "Add Button" }).click();

  // await page.getByRole('combobox', { name: "Reply" }).nth(1).click();
  // await page.waitForTimeout(1000);
  // await page.getByRole('option', { name: 'URL Action' }).click();
  // await page.waitForTimeout(1000);
  // await page.locator('textarea[name="suggestionText"]').nth(1).fill("Click to Visit");
  // await page.locator('[name="urlAction"]').fill("https://testers.com");

  // // Add Button (3) & Select URL Action
  // await page.getByRole('button', { name: "Add Button" }).click();

  // await page.getByRole('combobox', { name: "Reply" }).nth(2).click();
  // await page.waitForTimeout(1000);
  // await page.getByRole('option', { name: 'Dialer Action' }).click();
  // await page.waitForTimeout(1000);
  // await page.locator('textarea[name="suggestionText"]').nth(2).fill("Call Now");
  // await page.locator('[name="phoneNumberToDial.number"]').fill('8989898989')
  // await page.waitForTimeout(1000);


  // Submit the Form
  await page.locator('button', { hasText: 'Create Template' }).click();

  // Take screenshot
  await page.waitForTimeout(5000);
  await page.screenshot({ path: 'screenshots/success_upload.png', fullPage: true });

});