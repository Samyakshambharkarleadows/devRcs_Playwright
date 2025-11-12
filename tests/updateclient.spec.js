const {test, expect} = require('@playwright/test')
const { time } = require('console')
const { waitForDebugger } = require('inspector')
const { postMessageToThread } = require('worker_threads')

test('Launch Application', async({page}) => {
    await page.goto('https://qarcs.pinlab.in/auth/login')

    // await page.locator("xpath=//*[@id='mui-1']").fill("admin@pinnacle.in")     // Its Correct 
    
    await page.getByRole('textbox', { name: 'Username'}).fill("admin@pinnacle.in")
    await page.locator("css=#outlined-adornment-password").fill("1234567890")
    await page.getByRole('button', {name: 'Sign in'}).click();
    await page.getByText('Clients').click();

    // Click on Edit Button.
    await page.locator('[data-testid="EditIcon"]').first().click();
    
    // Now take a current timestamp for uniqueness.
    const timestamp = Date.now();

    // Now filling form of Add New Client == IDEAL PASSING CASES 
    const uniqueClientName = `SamyakQA_${timestamp}_UPD`;
    await page.locator("xpath=//*[@id='clientName']").fill(uniqueClientName)
    // const uniqueWebsite = `https://samyak${timestamp}.com`;

    await page.locator("xpath=//*[@id='orgWebsiteUrl']").fill("https://leadows.qa.com")
    await page.locator('[name="adminFirstName"]').fill(uniqueClientName);  // using same name as UniqueClientName
    await page.locator('[name="adminLastName"]').fill(uniqueClientName);   // using same name as UniqueClientName

    await page.locator('[name="contactPersonDesignation"]').fill(uniqueClientName); // using same name as UniqueClientName

    // Brand Details
    await page.locator('[name="brandName"]').fill(uniqueClientName) // using same name as UniqueClientName

    // Submit Form
    await page.locator('button', { hasText: 'Update' }).click();
    await page.waitForTimeout(5000);
    await page.screenshot({ path: 'screenshots/Update_success_upload.png', fullPage: true });

});