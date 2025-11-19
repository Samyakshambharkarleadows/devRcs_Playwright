const { execSync } = require('child_process');

// All tests in order
const testsInOrder = [
  'tests/addclient.spec.js',
  'tests/updateclient.spec.js',
  'tests/updateRates.spec.js',
  'tests/addBot.spec.js',
  'tests/updateBot.spec.js',
  'tests/verifyBot.spec.js',
  'tests/changeBotStatus.spec.js',
  'tests/addTextTemplate.spec.js',
  'tests/addStandAloneTemplate.spec.js',
  'tests/addCarouselTemplate.spec.js',
  'tests/addCampaign.spec.js',
  'tests/runCampaign.spec.js',
];

// Clean previous results
console.log("\n🧹 Cleaning previous results...\n");
try {
  execSync("rm -rf test-results playwright-report", { stdio: "ignore" });
} catch (err) {
  // ignore for Windows
}

for (const testFile of testsInOrder) {
  console.log(`\n🚀 Running: ${testFile}...\n`);

  // Each test gets its own result folder (required for merging)
  const outputFolder = `test-results/${testFile.replace(/[\\/]/g, '_')}`;

  try {
    execSync(
      `npx playwright test ${testFile} --project=chromium --reporter=line --output=${outputFolder}`,
      { stdio: 'inherit' }
    );
  } catch (error) {
    console.error(`❌ Test failed → ${testFile}`);
    console.log("➡️  Continuing with next test...\n");
    // NOTE: we do NOT exit — remaining tests will run
  }
}

console.log("\n📦 Merging all test result folders...\n");

// Generate final HTML report from ALL output folders
execSync(`npx playwright merge-reports test-results --reporter html`, {
  stdio: 'inherit',
});

console.log("\n🎉 ALL DONE!");
console.log("📄 Final Report: playwright-report/index.html\n");
