const { execSync } = require('child_process');

// Ordered execution
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

// Cleanup old artifacts
console.log("\n🧹 Cleaning old results...\n");
try {
  execSync("rm -rf test-results playwright-report", { stdio: 'ignore' });
} catch(e) {}

for (const testFile of testsInOrder) {
  console.log(`\n🚀 Running: ${testFile}...\n`);

  const out = `test-results/${testFile.replace(/[\\/]/g, '_')}`;

  try {
    // IMPORTANT: use reporter=blob (required for merge)
    execSync(
      `npx playwright test ${testFile} --project=chromium --reporter=blob --output=${out}`,
      { stdio: 'inherit' }
    );
  } catch (err) {
    console.error(`❌ Failed: ${testFile}, continuing...\n`);
  }
}

console.log("\n📦 Merging all blob reports into ONE HTML report...\n");

execSync(
  `npx playwright merge-reports test-results --reporter html`,
  { stdio: 'inherit' }
);

console.log("\n🎉 DONE! Final report generated at: playwright-report/index.html\n");
