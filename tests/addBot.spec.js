const {test, expect} = require('@playwright/test')
const { time } = require('console')
const { waitForDebugger } = require('inspector')
const { postMessageToThread } = require('worker_threads')

test('Launch Application', async({page}) => {
    test.setTimeout(0); // disables test timeout (never stops)

    await page.goto('https://devrcs.pinnacle.in/auth/login')

    await page.locator("xpath=//*[@id='mui-1']").fill("admin@pinnacle.in")
    await page.locator("css=#outlined-adornment-password").fill("1234567890")
    await page.getByRole('button', {name: 'Sign in'}).click();

    // Click on RCS Management
    await page.getByRole('button', { name: 'RCS Management'}).click();
    await page.getByRole('link', { name: 'Bots'}).click();

    // Click on Add New Bot button to open Form.
    await page.getByRole('button', { name: 'Add New Bot'} ).click();

    // Now take a current timestamp for uniqueness.
    const timestamp = Date.now();

    // Now filling form of Add New BOT == IDEAL PASSING CASES 
    const uniqueClientName = `SamyakQA_${timestamp}`;

    await page.locator('[name="botName"]').fill(uniqueClientName);
    await page.getByRole('combobox', { name: 'Select Brand'}).click();
    await page.locator('li[role="option"][data-value="Pinnacle Teleservices 33 Pvt. Ltd."]').click();
    // await page.getByRole('combobox', {})



    // await page.locator("xpath=//*[@id='clientName']").fill(uniqueClientName)
    // // const uniqueWebsite = `https://samyak${timestamp}.com`;
    // await page.locator("xpath=//*[@id='orgWebsiteUrl']").fill("https://leadows.qa.com")
    // await page.locator('[name="adminFirstName"]').fill(uniqueClientName);  // using same name as UniqueClientName
    // await page.locator('[name="adminLastName"]').fill(uniqueClientName);   // using same name as UniqueClientName

    // const uniqueEmail = `samyak${timestamp}@gmail.com`;
    // await page.locator('[name="email"]').fill(uniqueEmail);

    // await page.getByRole('button', { name: 'Generate Password'}).click(); 

    // await page.locator('[name="contactPersonDesignation"]').fill(uniqueClientName);

    // await page.getByRole('combobox', { name: 'Select Provider' }).click();
    // await page.locator('li[role="option"][data-value="VI_INDIA"]').click();

    // await page.getByRole('combobox', { name: 'Country' }).click();
    // await page.waitForSelector('li[data-value="India"]', { state: 'visible' });
    // await page.locator('li[data-value="India"]').click();

    // await page.getByRole('combobox', { name: 'State' }).click();
    // await page.waitForSelector('li[data-value="Maharashtra"]', { state: 'visible' });
    // await page.locator('li[data-value="Maharashtra"]').click();

    // await page.getByRole('combobox', { name: 'City' }).click();
    // await page.waitForSelector('li[data-value="Nagpur"]', { state: 'visible', timeout: 60000 });
    // await page.locator('li[data-value="Nagpur"]').click();

    // await page.locator('[name="mobileNumber"]').fill("8956362903")
    // await page.locator('[name="companyAddress.addressLine1"]').fill("TEST RESIDENCY, NAGPUR")
    // await page.locator('[name="companyAddress.addressLine2"]').fill("NEAR ITWARI MEHDIBAGH NAGPUR")
    // await page.locator('[name="companyAddress.zipCode"]').fill("445566")

    // // Brand Details
    // await page.locator('[name="brandName"]').fill(uniqueClientName)

    // await page.locator('xpath=//*[@id="industryType"]').click()
    // await page.waitForSelector('li[data-value="Advertising/marketing"]', {state : 'visible' });
    // await page.locator('li[data-value="Advertising/marketing"]').click();
    // await page.locator('[name="officialBrandWebsite"]').fill("https://leadows.qa.com");

    // const [logoChooser] = await Promise.all([
    //    page.waitForEvent('filechooser', { state: 'visible', timeout: 60000 }),
    //    page.getByRole('button', { name: 'Choose' }).nth(0).click(),
    //   ]);
    // await logoChooser.setFiles('assets/logo.png');
    // await page.locator('.ReactCrop__crop-selection[role="group"]').click();
    // await page.waitForTimeout(5000); // waits for 5 seconds (5000 milliseconds)
    // await page.locator('button', { hasText: 'Select' }).click();

    // // Documents Uplaod
    // await page.getByRole('combobox', { name: 'Select Document Type' }).nth(0).click();
    // await page.waitForSelector('li[data-value="PAN card of Company"]', {state: 'visible'});
    // await page.locator('li[data-value="PAN card of Company"]').click();
    // const panInput = await page.locator('input[type="file"]').nth(1);
    // await panInput.setInputFiles('assets/pan.pdf');

    // await page.getByRole('combobox', { name: 'Select Document Type' }).nth(1).click();
    // await page.waitForSelector('li[data-value="GST document"]', { state: 'visible' });
    // await page.locator('li[data-value="GST document"]').click();
    // await page.waitForSelector('input[type="file"]', { state: 'attached', timeout: 60000 });
    // const gstInput = await page.locator('input[type="file"]').nth(1);
    // await gstInput.setInputFiles('assets/gst.pdf');

    // // Submit Form
    // await page.getByText('Add Client').click();
    await page.waitForTimeout(5000);
    await page.screenshot({ path: 'screenshots/success_upload.png', fullPage: true });

});