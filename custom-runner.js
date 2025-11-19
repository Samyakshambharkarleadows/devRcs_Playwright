const { execSync } = require('child_process');
const fs = require("fs");

// Remove old results
function safeDelete(folder) {
  if (fs.existsSync(folder)) {
    fs.rmSync(folder, { recursive: true, force: true });
  }
}
safeDelete("test-results");
safeDelete("playwright-report");

const testsInOrder = [
  'tests/addclient.spec.js',
  'tests/updateclient.spec.js',
  // 'tests/updateRates.spec.js',
  // 'tests/addBot.spec.js',
  // 'tests/updateBot.spec.js',
  // 'tests/verifyBot.spec.js',
  // 'tests/changeBotStatus.spec.js',
  // 'tests/addTextTemplate.spec.js',
  // 'tests/addStandAloneTemplate.spec.js',
  // 'tests/addCarouselTemplate.spec.js',
  // 'tests/addCampaign.spec.js',
  // 'tests/runCampaign.spec.js',
];

for (const testFile of testsInOrder) {
  console.log(`\n🚀 Running: ${testFile}...\n`);
  try {
    execSync(`npx playwright test ${testFile} --project=chromium --reporter=line,html`, { stdio: 'inherit' });
  } catch (error) {
    console.error(`❌ Test failed in ${testFile}`);
    // process.exit(1); // stop if any test fails (optional)
  }
}