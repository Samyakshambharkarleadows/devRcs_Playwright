const {test, expect} = require('@playwright/test')
const { time } = require('console')
const { waitForDebugger } = require('inspector')
const { postMessageToThread } = require('worker_threads')

test('Launch Application', async({page}) => {

    // await page.goto('https://qarcs.pinlab.in/auth/login')
    await page.goto('/auth/login')

    // test.setTimeout(0); // disables test timeout (never stops)

    // Login into devrcs.pinnacle.in using Support SuperAdmin Credentils.
    // await page.locator("xpath=//*[@id='mui-1']").fill("rbm-support@pinnacle.in")
    // await page.locator("css=#outlined-adornment-password").fill("SuperAdmin@123")

    await page.getByRole('textbox', { name: 'Username'}).fill(process.env.PINNACLE_SUPERADMIN_USERNAME);
    await page.getByRole('textbox', { name: 'Password'}).fill(process.env.PINNACLE_SUPERADMIN_PASSWORD);
    await page.getByRole('button', { name: 'Sign in' }).click();

    // Click SuperAdmin on Side bar
    await page.getByRole('link', { name: 'SuperAdmin' }).click();

    // Click on Add New Super Admin Button to open form
    await page.getByRole('button', { name: 'Add New Super Admin'}).click();

    // Now take a current timestamp for uniqueness.
    const timestamp = Date.now().toString().split(-6);

    // Now filling form of Add New Client == IDEAL PASSING CASES 
    const SuperAdminName = `SamyakQA_${timestamp}`;
    const uniqueEmail = `samyak${timestamp}@gmail.com`;

    await page.getByRole('textbox', { name: 'Super Admin Name'}).fill(SuperAdminName)
    await page.getByRole('textbox', { name: 'Email'}).fill(uniqueEmail);

    // Select Country, State and City 
    await page.getByRole('combobox', { name: 'Country' }).click();
    await page.locator('[placeholder="Search country"]').fill('India');
    await page.locator('li[data-value="IN"]').click();
    await page.waitForTimeout(2000);

    await page.getByRole('combobox', { name: 'State' }).click();
    await page.locator('[placeholder="Search State"]').fill('Maharashtra');
    await page.locator('li[data-value="MH"]').click();
    await page.waitForTimeout(2000);

    await page.getByRole('combobox', { name: 'City' }).click();
    await page.locator('[placeholder="Search city"]').fill('Nagpur')
    await page.locator('li[data-value="Nagpur"]').click();
    await page.waitForTimeout(2000);

    await page.locator('[name="mobileNumber"]').fill("8956362903")
    
    // Generate password
    await page.getByRole('button', { name: 'Generate Password'}).click();
    await page.waitForTimeout(3000);

    // Submit Form
    await page.getByRole('button', { name: 'Add Super Admin'}).click();
    await page.waitForTimeout(5000);
    await page.screenshot({ path: 'screenshots/success_upload.png', fullPage: true });

});