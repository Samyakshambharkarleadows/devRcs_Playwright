const { execSync } = require('child_process');
const fs = require("fs");

// Cleaner working on Linux, Windows, CI/CD
function safeDelete(folder) {
  if (fs.existsSync(folder)) {
    fs.rmSync(folder, { recursive: true, force: true });
  }
}

console.log("\n🧹 Cleaning old results...\n");
safeDelete("test-results");
safeDelete("playwright-report");

// All tests in order
const testsInOrder = [
  'tests/addclient.spec.js',
  'tests/updateclient.spec.js',
  'tests/updateRates.spec.js',
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
    // Use BLOB reporter (required for merging)
    execSync(
      `npx playwright test ${testFile} --project=chromium --reporter=blob --output=${out}`,
      { stdio: 'inherit' }
    );
  } catch (err) {
    console.error(`❌ Test failed → ${testFile}`);
    console.log("➡️  Continuing...\n");
  }
}

console.log("\n📦 Merging all blob result folders...\n");

execSync(
  `npx playwright merge-reports test-results --reporter html`,
  { stdio: 'inherit' }
);

console.log("\n🎉 DONE! Final merged report → playwright-report/index.html\n");
