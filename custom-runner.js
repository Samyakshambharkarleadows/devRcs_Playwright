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
  'tests/addclient.spec.js',                    // This is from Pinnacle Reseller admin (admin@pinnacle.in)
  'tests/updateclient.spec.js',                 // This is from Pinnacle Reseller admin (admin@pinnacle.in)
  'tests/updateRates.spec.js',                  // This is from Pinnacle Reseller admin (admin@pinnacle.in)
  'tests/addBot.spec.js',                       // This is from Pinnacle Reseller admin (admin@pinnacle.in)
  'tests/updateBot.spec.js',                    // This is from Pinnacle Reseller admin (admin@pinnacle.in)
  'tests/verifyBot.spec.js',                    // This is from Pinnacle Reseller admin (admin@pinnacle.in)
  'tests/changeBotStatus.spec.js',              // This is from Pinnacle Reseller admin (admin@pinnacle.in)
  'tests/addTextTemplate.spec.js',              // This is from Pinnacle Reseller admin (admin@pinnacle.in)
  'tests/addStandAloneTemplate.spec.js',        // This is from Pinnacle Reseller admin (admin@pinnacle.in)
  'tests/addCarouselTemplate.spec.js',          // This is from Pinnacle Reseller admin (admin@pinnacle.in)
  'tests/addCombinationTemplate.spec.js',       // This is from Pinnacle Reseller admin (admin@pinnacle.in)

  'tests/addCampaign.spec.js',       //This is from RESELLER ADMIN LOGIN (Vrinda)
  'tests/runCampaign.spec.js',       //This is from RESELLER ADMIN LOGIN (Vrinda)

  'tests/addReseller.spec.js',             //  This is from SUPPORT SUPER ADMIN LOGIN (rbm-suport@pinnacle.in)
  'tests/updateResellerRates.spec.js',     //  This is from SUPPORT SUPER ADMIN LOGIN (rbm-suport@pinnacle.in)
  'tests/updateResellerRecharge.spec.js',  //  This is from SUPPORT SUPER ADMIN LOGIN (rbm-suport@pinnacle.in)
  'tests/createSuperAdmin.spec.js',        //  This is from SUPPORT SUPER ADMIN LOGIN (rbm-suport@pinnacle.in)
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