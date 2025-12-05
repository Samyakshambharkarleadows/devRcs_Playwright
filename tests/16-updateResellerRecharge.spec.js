const { test, expect } = require('@playwright/test')
const { time } = require('console')
const { waitForDebugger } = require('inspector')
const { postMessageToThread } = require('worker_threads')

test('Launch Application', async ({ page }) => {
    await page.goto('https://qarcs.pinlab.in/auth/login')
    // test.setTimeout(0); // disables test timeout (never stops)

    // Login into devrcs.pinnacle.in using Support SuperAdmin Credentils.
    // await page.locator("xpath=//*[@id='mui-1']").fill("rbm-support@pinnacle.in")
    // await page.locator("css=#outlined-adornment-password").fill("SuperAdmin@123")
    await page.getByRole('textbox', { name: 'Username'}).fill(process.env.RESELLER_SUPERADMIN_USERNAME);
    await page.getByRole('textbox', { name: 'Password'}).fill(process.env.RESELLER_SUPERADMIN_PASSWORD);
    await page.getByRole('button', { name: 'Sign in' }).click();

    // Click on RCS Management
    await page.getByRole('button', { name: 'Billing' }).click();
    await page.getByRole('link', { name: 'Recharge' }).click();

    // Click on Filter Button
    await page.getByRole('button', { name: "Filter"}).click();

    // Enter the Hardcoded Reseller name "Takshashil Foundation" to filter it
    await page.getByRole('textbox', { name: "name"}).fill('Takshashil Foundation');
    await page.getByRole('button', { name: "Search"}).click();

    // ========================== Add Recharge of 500 rs =============================
    await page.getByTestId('MoreVertIcon').nth(0).click();
    await page.waitForTimeout(1000);
    await page.getByTestId('AddCircleOutlineRoundedIcon').click();
    await page.getByRole('spinbutton', {name: 'recharge'}).fill('500');
    await page.getByRole('textbox', { name: 'Description'}).fill('This 500 is added to test recharge. This is Automated flow')
    // Submit Button 
    // await page.waitForTimeout(3000);
    await page.getByRole('button', { name: "Submit"}).click();
    await page.waitForSelector('[data-testid="SuccessOutlinedIcon"]'); // Check this is Sucessfully created or not. IF FAILED MEANS TEST FAIL
    await page.waitForTimeout(2000);

    // ========================== Deduct Recharge of 100 rs ===========================
    // await page.getByTestId('MoreVertIcon').nth(0).click();
    await page.locator('[data-testid="MoreVertIcon"]').click();

    await page.getByTestId('RemoveCircleOutlineIcon').click();
    await page.locator('[name="deduct"]').fill('100');
    await page.getByRole('textbox', { name: 'Description'}).fill('This 100 is Deducted to test recharge. This is Automated flow')
    // Submit Button 
    await page.getByRole('button', { name: "Submit"}).click();
    await page.waitForSelector('[data-testid="SuccessOutlinedIcon"]'); // Check this is Sucessfully created or not. IF FAILED MEANS TEST FAIL
    await page.waitForTimeout(2000);

    // ========================== Now change the Billing Type to POSTPAID==========================
    await page.getByTestId('MoreVertIcon').nth(0).click();

    await page.getByTestId('CurrencyExchangeIcon').click();
    await page.locator('[value="Postpaid"]').click();
    // Add Cap Check of 10000 rs  
    await page.getByRole('checkbox', { name: 'Cap Check'}).click();
    await page.locator('[name="maxBalanceLimit"]').fill('1000');
    
    // Submit Button 
    await page.getByRole('button', { name: "Submit"}).click();
    await expect(page.getByText('Billing Type Changed Successfully.')).toBeVisible();
    await page.waitForTimeout(2000);

    // ========================== Again change the POSTPAID Type to PREPAID Type ==========================
    await page.getByTestId('MoreVertIcon').nth(0).click();

    await page.locator('[data-testid="CurrencyExchangeIcon"]').nth(0).click();

    await page.locator('[value="Prepaid"]').click();
    // Add now balance of 10000 rs  
    // await page.getByRole('spinbutton', {name: "currentBalance"}).fill('1000');
    await page.locator('[name="currentBalance"]').fill('1000');
    // Submit Button 
    await page.getByRole('button', { name: "Submit"}).click();
    await expect(page.getByText('Billing Type Changed Successfully.')).toBeVisible(); // Check this is Sucessfully created or not. IF FAILED MEANS TEST FAIL
    await page.waitForTimeout(2000);

    // End of the test Screen shot 
    await page.waitForTimeout(5000);
    await page.screenshot({ path: 'screenshots/Update_success_upload.png', fullPage: true });

});