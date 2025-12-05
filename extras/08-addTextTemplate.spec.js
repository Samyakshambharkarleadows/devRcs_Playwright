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
  await page.getByRole('link', { name: 'Templates' }).click();

  // Click on Add New Bot button to open Form.
  await page.getByRole('button', { name: 'Add New Template' }).click();

  // Select BOT
  await page.locator('div[role="combobox"][id="botType-label"]').click();
  await page.locator("li[role='option']", { hasText: "Pinnacle's Campaign Bot" }).click();

  // Now take a current timestamp for uniqueness.
  const timestamp = Date.now().toString().slice(-6); // Slice last 6 diguits

  // Now filling form of Add New BOT == IDEAL PASSING CASES 
  const templateName = `TXT${timestamp}QA`;
  await page.getByRole('textbox', { name:'Template Name'}).fill(templateName)
  
  // Template type is Text already selected.
  // Enter message content
  await page.getByPlaceholder('Enter text message here').fill("This is testing message, Please Approve this- Created by Samyak (QA - Leadows) ")

  // Add Button (1)
  await page.getByRole('button', { name: "Add Button"}).click();
  await page.locator('textarea[name="suggestionText"]').fill("Happy Testing"); //----------------USED WHEN NO NAME IS GIVEN

  // Add Button (2) & Select URL Action
  await page.getByRole('button', { name: "Add Button"}).click();

  await page.getByRole('combobox', { name: "Reply" }).nth(1).click();
  await page.waitForTimeout(1000);
  await page.getByRole('option', { name: 'URL Action'}).click();
  await page.waitForTimeout(1000);
  await page.locator('textarea[name="suggestionText"]').nth(1).fill("Click to Visit");
  await page.locator('[name="urlAction"]').fill("https://testers.com");

  // Add Button (3) & Select URL Action
  await page.getByRole('button', { name: "Add Button"}).click();
  
  await page.getByRole('combobox', { name: "Reply" }).nth(2).click();
  await page.waitForTimeout(1000);
  await page.getByRole('option', { name: 'Dialer Action'}).click();
  await page.waitForTimeout(1000);
  await page.locator('textarea[name="suggestionText"]').nth(2).fill("Call Now");
  await page.locator('[name="phoneNumberToDial.number"]').fill('8989898989')
  await page.waitForTimeout(1000);


  // Submit the Form
  await page.locator('button', { hasText: 'Create Template' }).click();

  // Take screenshot
  await page.waitForTimeout(5000);
  await page.screenshot({ path: 'screenshots/success_upload.png', fullPage: true });

});