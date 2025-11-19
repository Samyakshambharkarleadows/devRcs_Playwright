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

  const out = `test-results/${testFile.replace(/[\\/]/g, '_')}`;

  try {
    // JSON reporter ALWAYS works, never skipped
    execSync(
      `npx playwright test ${testFile} --project=chromium --reporter=json --output=${out}`,
      { stdio: 'inherit' }
    );
  } catch (err) {
    console.error(`❌ Test failed → ${testFile}`);
  }
}

console.log("\n📦 Merging all JSON reports...\n");

// Combine all JSON result files to one
execSync(
  `npx playwright merge-reports test-results --reporter json > merged-report.json`,
  { shell: true }
);

// Convert merged JSON to HTML
execSync(
  `npx playwright show-report merged-report.json --reporter html --output=playwright-report`,
  { stdio: 'inherit' }
);

console.log("\n🎉 DONE! Final report → playwright-report/index.html\n");
