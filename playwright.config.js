// @ts-check
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',

  /* Run tests in files in parallel locally, but sequentially on CI */
  fullyParallel: !process.env.CI,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined, // CI = 1 worker for stability, local = auto

  /* Reporter */
  reporter: [
    ['list'], // shows clean console output
    ['html', { outputFolder: 'playwright-report', open: 'never' }]
  ],

  /* Shared options for all tests */
  use: {
    trace: 'on-first-retry',
    headless: !!process.env.CI, // force headless on CI
    ignoreHTTPSErrors: true,
    screenshot: 'on',
    video: 'retain-on-failure', // lighter than "on" (saves only failures)
    viewport: { width: 1280, height: 720 },
    timeout: 120000,
    actionTimeout: 60000,
  },

  /* Projects: define which browsers to run on */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    // Uncomment below if you want to test on multiple browsers:
    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },
    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },
  ],

  /* Optional: Run dev server automatically before tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
