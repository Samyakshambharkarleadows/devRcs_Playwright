// @ts-check
import dotenv from 'dotenv';
dotenv.config();

import { defineConfig, devices } from '@playwright/test';

const timestamp = new Date().toISOString().replace(/[:.]/g, '-');

export default defineConfig({
  testDir: './tests',

  fullyParallel: false,        // Sequential execution
  workers: 1,                  // IMPORTANT: run in exact file order
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  preserveOutput: 'always',

  reporter: [
    ['list'],
    ['html', {
      // outputFolder: `playwright-report-${timestamp}`, 
      outputFolder: `playwright-report/report-${timestamp}`, // To create folders inside that Reports folder
      open: 'never'
    }]
  ],

  use: {
    baseURL: process.env.BASE_URL,
    trace: 'on-first-retry',
    headless: !!process.env.CI,
    ignoreHTTPSErrors: true,
    screenshot: 'on',
    video: 'retain-on-failure',
    viewport: { width: 1280, height: 720 },
    timeout: 120000,
    actionTimeout: 60000,
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    }
  ],
});


// // @ts-check
// import dotenv from 'dotenv';
// dotenv.config();

// import { defineConfig, devices } from '@playwright/test';


// export default defineConfig({
//   testDir: './tests',

//   /* Run tests in files in parallel locally, but sequentially on CI */
//   fullyParallel: !process.env.CI,
//   forbidOnly: !!process.env.CI,
//   retries: process.env.CI ? 2 : 0,
//   workers: process.env.CI ? 1 : undefined, // CI = 1 worker for stability, local = auto

//   preserveOutput: 'always', // Ensure JSON & screenshot Never deleted 


//   /* Reporter */
//   reporter: [
//     ['list'], // shows clean console output
//     ['html', { outputFolder: 'playwright-report', open: 'never' }]
//   ],

//   /* Shared options for all tests */
//   use: {
//     baseURL: process.env.BASE_URL,   // FOR DOMAINS
//     trace: 'on-first-retry',
//     headless: !!process.env.CI, // force headless on CI
//     ignoreHTTPSErrors: true,
//     screenshot: 'on',
//     video: 'retain-on-failure', // lighter than "on" (saves only failures)
//     viewport: { width: 1280, height: 720 },
//     timeout: 120000,
//     actionTimeout: 60000,
//   },

//   /* Projects: define which browsers to run on */
//   projects: [
//     {
//       name: 'chromium',
//       outputDir: undefined,  // Does not overrides
//       use: { ...devices['Desktop Chrome'] },
//     },
//   ],
// });
