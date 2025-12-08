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
    await page.getByRole('textbox', { name: 'Username' }).fill(process.env.RESELLER_ADMIN_USERNAME);
    await page.getByRole('textbox', { name: 'Password' }).fill(process.env.RESELLER_SUPERADMIN_PASSWORD);
    await page.getByRole('button', { name: 'Sign in' }).click();

    // Click on RCS Management
    await page.getByRole('button', { name: 'RCS Management' }).click();
    await page.getByRole('link', { name: 'Resellers' }).click();

    // Click on Edit icon below Providers
    await page.locator('[data-testid="EditIcon"]').nth(1).click();

    // Click on Edit icon Again below Customized Rates
    await page.locator('[data-testid="EditIcon"]').nth(0).click();

    // Click on Edit icon Again below EDIT inside Customized Rates page
    await page.locator('[data-testid="EditIcon"]').nth(0).click();

    // Click on Edit Rates button inside Organization Customized Rates page
    await page.locator('[name="updatedTextMessageRate"]').fill('1');
    await page.locator('[name="updatedMultiMediaMessageRate"]').fill('2');
    await page.locator('[name="updatedA2pSessionConversationRate"]').fill('3');
    await page.locator('[name="updatedFeedbackRate"]').fill('4');
    await page.locator('[name="otherFields.userMessageRate"]').fill('5');
    await page.locator('[name="otherFields.P2aConversationRate"]').fill('6');

    // Click on Update & Save
    await page.getByRole('button', { name: 'Update' }).click();

    await page.waitForTimeout(5000);
    await page.screenshot({ path: 'screenshots/Update_success_upload.png', fullPage: true });

});