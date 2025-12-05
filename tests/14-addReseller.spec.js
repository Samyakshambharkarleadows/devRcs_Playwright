const { test, expect } = require('@playwright/test')
const { time } = require('console')
const { waitForDebugger } = require('inspector');
const { buffer } = require('stream/consumers');
const { postMessageToThread } = require('worker_threads')

// Add Resellers and Update its Status to ACTIVE

test('Launch Application', async ({ page }) => {

  await page.goto('https://qarcs.pinlab.in/auth/login')

  // await page.locator("xpath=//*[@id='mui-1']").fill("rbm-support@pinnacle.in")
  // await page.locator("css=#outlined-adornment-password").fill("SuperAdmin@123")

  await page.getByRole('textbox', { name: 'Username'}).fill(process.env.PINNACLE_SUPERADMIN_USERNAME);
  await page.getByRole('textbox', { name: 'Password'}).fill(process.env.PINNACLE_SUPERADMIN_PASSWORD);
  await page.getByRole('button', { name: 'Sign in' }).click();

  // Click on RCS Management
  await page.getByRole('button', { name: 'RCS Management' }).click();
  await page.getByRole('link', { name: 'Resellers' }).click();

  // Click on Add New Bot button to open Form.
  await page.getByRole('button', { name: 'Add New Reseller' }).click();

  // Now take a current timestamp for uniqueness.
  const timestamp = Date.now().toString().split(-6);

  // Now filling form of Add Reseller name and all
  const uniqueName = `SamyakQA_${timestamp}`;
  // Now filling form of Website URL 
  const website = `https://sam${timestamp}qa.com`;
  // Now filling form of Website URL 
  const email = `samyak${timestamp}qa@gmail.com`;
  // Unique Customer ID 
  const id = `Id${timestamp}`;

  // Reseller Name
  await page.locator('xpath=//*[@id="resellerName"]').fill(uniqueName);

  // Reseller Website
  await page.locator('xpath=//*[@id="resellerWebsiteUrl"]').fill(website);

  // Reseller First Name
  await page.getByRole('textbox', { name: 'Reseller Admin Email' }).fill(email);

  // Generate Password
  await page.getByRole('button', { name: 'Generate Password'}).click();

  // Reseller Last Name
  await page.getByRole('textbox', { name: 'Reseller Admin First Name' }).fill(uniqueName);

  // Reseller Email
  await page.getByRole('textbox', { name: 'Reseller Admin Last Name' }).fill(uniqueName);

  // company person designation
  await page.getByRole('textbox', { name: 'Company Person Designation' }).fill('Tester');

  // Select Provider
  await page.locator('div[role="combobox"][id="provider"]').click();
  // await page.keyboard.press('Enter');             // -------------- This is working for now but Its not an good Approach.
  await page.getByText('VI-INDIA').click();       // This is the correct Approach.
  await page.locator('xpath=//*[@id="menu-supportedProvidersList"]').click()

  await page.getByRole('combobox', { name: 'Country' }).click();
  await page.waitForSelector('li[data-value="India"]', { state: 'visible' });
  await page.locator('li[data-value="India"]').click();

  await page.getByRole('combobox', { name: 'State' }).click();
  await page.waitForSelector('li[data-value="Maharashtra"]', { state: 'visible' });
  await page.locator('li[data-value="Maharashtra"]').click();

  await page.getByRole('combobox', { name: 'City' }).click();
  await page.waitForSelector('li[data-value="Nagpur"]', { state: 'visible', timeout: 60000 });
  await page.locator('li[data-value="Nagpur"]').click();

  await page.locator('[name="mobileNumber"]').fill("8956362903")
  await page.locator('[name="companyAddress.address"]').fill("TEST RESIDENCY, NAGPUR")
  await page.locator('[name="companyAddress.zipCode"]').fill("445566")

  // Domain, for Reseller 
  await page.locator('[name="domain"]').fill(website);
  await page.locator('[name="apiDomain"]').fill(website);
  await page.locator('[name="billingCustomerName"]').fill(uniqueName);
  await page.locator('[name="billingCustomerId"]').fill(id);

  // Uplaod Logo 
  const [logoChooser] = await Promise.all([
    page.waitForEvent('filechooser', { state: 'visible', timeout: 60000 }),
    page.getByRole('button', { name: 'Choose' }).nth(0).click(),
  ]);
  await logoChooser.setFiles('assets/logo.png');
  await page.locator('.ReactCrop__crop-selection[role="group"]').click();
  await page.waitForTimeout(3000); // waits for 3 seconds (3000 milliseconds)
  await page.locator('button', { hasText: 'Select' }).click();

  // Prepaid - Add Balance
  await page.locator('[name="currentBalance"]').fill('1000');

  // Submit the Form
  await page.locator('button', { hasText: 'Add Reseller' }).click();
  await page.waitForTimeout(3000);

  // Now Click on Edit Icon --> To change the status of this reseller as Active.
  await page.locator('[data-testid="EditIcon"]').nth(0).click();
  await page.waitForTimeout(2000);

  // Change the Status of this newly created Reseller from IN-ACTVE to ACTIVE\
  await page.locator('[name="radio-buttons-group"]').nth(2).click();

  // Click on Update the Form
  await page.locator('button', { hasText: 'Update' }).click();

  // Take screenshot
  await page.waitForTimeout(3000);
  await page.screenshot({ path: 'screenshots/success_upload.png', fullPage: true });
});