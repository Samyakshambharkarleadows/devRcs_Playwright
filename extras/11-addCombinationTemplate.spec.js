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
  const templateName = `Combination${timestamp}`;
  await page.getByRole('textbox', { name: 'Template Name' }).fill(templateName)

  // Select Template Type
  // await page.locator('xpath=//*[@id="templatetype-label"]').nth(0).click();
  await page.locator('div[role="combobox"][id="templatetype-label"]').click();
  await page.locator("li[role='option']", { hasText: 'Rich Card Carousel' }).click();


  // ============================================== FIRST CARD (UPLOAD IMAGE FULL URL) ==========================================
  // Upload Image
  await page.getByRole('button', { name: 'Choose'}).click();
  // change to Import From URL
  await page.getByTestId('LinkIcon').click();
  //Write Public url
  await page.getByPlaceholder('https://example.com/image.jpg').fill("https://rcs-bot-media-public.s3.ap-south-1.amazonaws.com/65c9abf0c502b6060c815617/65c4eabecf32f14a18535f10/65c5c64e00e5f8732c02cdda/richCardStandAloneDetails_1708583770675_download%20%281%29.png");
  await page.getByRole('button', { name: 'import'}).click();

  // Wait for crop box to appear
  await page.locator('.ReactCrop__crop-selection[role="group"]').click();
  await page.getByRole('button', { name: 'Select', exact: true }).click(); 

  // Enter Card Title
  await page.getByRole('textbox', { name: 'Card Title' }).fill('UPLOAD-IMAGE')

  // Enter Card Description
  await page.getByRole('textbox', { name: 'Enter card description here' }).fill("Approve this message It is for testing - Created by Sammyak QA - Leadows")
  // Add Button (1)
  await page.getByRole('button', { name: "Add Button" }).click();
  await page.locator('textarea[name="suggestionText"]').fill("Happy Testing"); //----------------USED WHEN NO NAME IS GIVEN
  await page.waitForTimeout(2000);

  // ============================================== SECOND CARD (IMAGE VARIABLE) ====================================================
  // Click on 2nd Card
  await page.getByRole('tab', {name: 'Card 2'}).click();

  // Upload Image
  await page.getByRole('button', { name: 'Choose'}).click();
  // change to Import From URL
  await page.getByTestId('CodeIcon').click();
  //Write Public url
  await page.getByPlaceholder('https://example.com/[variable]').fill("https://rcs-bot-media-public.s3.ap-south-1.amazonaws.com/65c9abf0c502b6060c815617/65c4eabecf32f14a18535f10/65c5c64e00e5f8732c02cdda/[image]");
  await page.getByRole('button', { name: 'Select Variable URL'}).click();

  // Enter Card Title
  await page.getByRole('textbox', { name: 'Card Title' }).fill('VAR-IMAGE')

  // Enter Card Description
  await page.getByRole('textbox', { name: 'Enter card description here' }).fill("Approve this message It is for testing - Created by Sammyak QA - Leadows")
  // Add Button (1)
  await page.getByRole('button', { name: "Add Button" }).click();
  await page.locator('textarea[name="suggestionText"]').nth(1).fill("Happy Testing"); //----------------USED WHEN NO NAME IS GIVEN
  await page.waitForTimeout(2000);

  // ============================================== THIRD CARD (VIDEO VARIABLE) ====================================================
  // Click on Add Card
  await page.getByRole('button', {name: 'Add Card'}).click();
  
  // Click on 3rd Card
  await page.getByRole('tab', {name: 'Card 3'}).click();

  // Upload Image
  await page.getByRole('button', { name: 'Choose'}).click();
  // change to Import From URL
  await page.getByTestId('CodeIcon').click();
  
  // Click on Video Radio Button
  await page.locator('[value="video/mp4"]').click(); 
  
  //Write Public url
  await page.getByPlaceholder('https://example.com/[variable]').fill("https://rcs-bot-media-public.s3.ap-south-1.amazonaws.com/65c9abf0c502b6060c815617/65c4eabecf32f14a18535f10/65c5c64e00e5f8732c02cdda/[video]");
  await page.getByRole('button', { name: 'Select Variable URL'}).click();

  // Enter Card Title
  await page.getByRole('textbox', { name: 'Card Title' }).fill('VAR-VIDEO')

  // Enter Card Description
  await page.getByRole('textbox', { name: 'Enter card description here' }).fill("Approve this message It is for testing - Created by Sammyak QA - Leadows")
  // Add Button (1)
  await page.getByRole('button', { name: "Add Button" }).click();
  await page.locator('textarea[name="suggestionText"]').nth(2).fill("Happy Testing"); //----------------USED WHEN NO NAME IS GIVEN
  await page.waitForTimeout(2000);

  // ============================================== FOURTH CARD (PDF VARIABLE) ====================================================
  // Click on Add Card
  await page.getByRole('button', {name: 'Add Card'}).click();
  
  // Click on 3rd Card
  await page.getByRole('tab', {name: 'Card 4'}).click();

  // Upload Image
  await page.getByRole('button', { name: 'Choose'}).click();
  // change to Import From URL
  await page.getByTestId('CodeIcon').click();
  
  // Click on Video Radio Button
  await page.locator('[value="application/pdf"]').click();
  
  //Write Public url
  await page.getByPlaceholder('https://example.com/[variable]').fill("https://rcs-bot-media-public.s3.ap-south-1.amazonaws.com/665873c0c660399dce731130/6690deca0e202b00019c034d/6892f51ec1bc06845cbf4e42/[video]");
  await page.getByRole('button', { name: 'Select Variable URL'}).click();

  // Enter Card Title
  await page.getByRole('textbox', { name: 'Card Title' }).fill('VAR-PDF')

  // Enter Card Description
  await page.getByRole('textbox', { name: 'Enter card description here' }).fill("Approve this message It is for testing - Created by Sammyak QA - Leadows")
  
  // Add Button (1)
  await page.getByRole('button', { name: "Add Button" }).click();
  await page.locator('textarea[name="suggestionText"]').nth(3).fill("Happy Testing"); //----------------USED WHEN NO NAME IS GIVEN

  // Submit the Form
  await page.locator('button', { hasText: 'Create Template' }).click();

  // Take screenshot
  await page.waitForTimeout(5000);
  await page.screenshot({ path: 'screenshots/success_upload.png', fullPage: true });

});