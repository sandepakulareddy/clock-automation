/**
 * ========================================
 * BROWSERSTACK APP UPLOAD SCRIPT
 * ========================================
 * 
 * This script uploads an APK file to BrowserStack
 * and returns the app_url to use in your test
 * 
 * Usage: node scripts/uploadApp.js <path-to-apk>
 * Example: node scripts/uploadApp.js clock.apk
 */

const fs = require('fs');
const https = require('https');
const path = require('path');

// ========================================
// CONFIGURATION
// ========================================
const BROWSERSTACK_USERNAME = process.env.BROWSERSTACK_USERNAME || 'jaganbunny_Tx0REB';
const BROWSERSTACK_ACCESS_KEY = process.env.BROWSERSTACK_ACCESS_KEY || 'zqieqGpBZpbXi9CkmqiX';
const UPLOAD_URL = 'api-cloud.browserstack.com';
const UPLOAD_PATH = '/app-automate/upload';

// ========================================
// GET APK PATH FROM COMMAND LINE
// ========================================
const apkPath = process.argv[2];

if (!apkPath) {
    console.error('\n❌ Error: Please provide APK file path');
    console.log('\n📖 Usage: node scripts/uploadApp.js <path-to-apk>');
    console.log('   Example: node scripts/uploadApp.js clock.apk\n');
    process.exit(1);
}

// ========================================
// VALIDATE FILE EXISTS
// ========================================
const fullPath = path.resolve(apkPath);

if (!fs.existsSync(fullPath)) {
    console.error(`\n❌ Error: File not found: ${fullPath}\n`);
    process.exit(1);
}

if (!fullPath.endsWith('.apk')) {
    console.error('\n❌ Error: File must be an APK file (.apk extension)\n');
    process.exit(1);
}

// ========================================
// UPLOAD FUNCTION
// ========================================
async function uploadAppToBrowserStack() {
    console.log('\n' + '='.repeat(60));
    console.log('  📤 UPLOADING APP TO BROWSERSTACK');
    console.log('='.repeat(60));
    console.log(`\nFile: ${path.basename(fullPath)}`);
    console.log(`Size: ${(fs.statSync(fullPath).size / 1024 / 1024).toFixed(2)} MB`);
    console.log(`Path: ${fullPath}`);
    console.log('\n⏳ Uploading... Please wait...\n');

    return new Promise((resolve, reject) => {
        const fileContent = fs.readFileSync(fullPath);
        const boundary = '----WebKitFormBoundary' + Math.random().toString(16).substring(2);
        
        // Build multipart form data
        const formData = Buffer.concat([
            Buffer.from(`--${boundary}\r\n`),
            Buffer.from('Content-Disposition: form-data; name="file"; filename="' + path.basename(fullPath) + '"\r\n'),
            Buffer.from('Content-Type: application/vnd.android.package-archive\r\n\r\n'),
            fileContent,
            Buffer.from(`\r\n--${boundary}--\r\n`)
        ]);

        // Prepare request options
        const auth = Buffer.from(`${BROWSERSTACK_USERNAME}:${BROWSERSTACK_ACCESS_KEY}`).toString('base64');
        
        const options = {
            hostname: UPLOAD_URL,
            path: UPLOAD_PATH,
            method: 'POST',
            headers: {
                'Content-Type': `multipart/form-data; boundary=${boundary}`,
                'Content-Length': formData.length,
                'Authorization': `Basic ${auth}`
            }
        };

        // Make request
        const req = https.request(options, (res) => {
            let data = '';

            res.on('data', (chunk) => {
                data += chunk;
            });

            res.on('end', () => {
                if (res.statusCode === 200) {
                    try {
                        const response = JSON.parse(data);
                        resolve(response);
                    } catch (error) {
                        reject(new Error(`Failed to parse response: ${data}`));
                    }
                } else {
                    reject(new Error(`Upload failed with status ${res.statusCode}: ${data}`));
                }
            });
        });

        req.on('error', (error) => {
            reject(error);
        });

        req.write(formData);
        req.end();
    });
}

// ========================================
// MAIN EXECUTION
// ========================================
(async () => {
    try {
        const result = await uploadAppToBrowserStack();
        
        console.log('='.repeat(60));
        console.log('  ✅ UPLOAD SUCCESSFUL!');
        console.log('='.repeat(60));
        console.log('\n📱 App Details:');
        console.log(`   App URL:      ${result.app_url || 'N/A'}`);
        console.log(`   Custom ID:    ${result.custom_id || 'N/A'}`);
        console.log(`   Shareable ID: ${result.shareable_id || 'N/A'}`);
        
        console.log('\n🔧 Next Steps:');
        console.log('   1. Copy the App URL above');
        console.log('   2. Update your test script:');
        console.log('\n   In clockAlarmTest.js, update:');
        console.log(`   app: '${result.app_url}'`);
        console.log('\n   Or set environment variable:');
        console.log(`   $env:BROWSERSTACK_APP_ID="${result.app_url}"`);
        console.log('\n   3. Run your test:');
        console.log('   npm test');
        console.log('\n' + '='.repeat(60) + '\n');
        
        // Save to file for easy reference
        const resultFile = path.join(__dirname, '..', 'app-upload-result.json');
        fs.writeFileSync(resultFile, JSON.stringify(result, null, 2));
        console.log(`💾 Result saved to: app-upload-result.json\n`);
        
    } catch (error) {
        console.error('\n' + '='.repeat(60));
        console.error('  ❌ UPLOAD FAILED');
        console.error('='.repeat(60));
        console.error(`\n${error.message}\n`);
        
        if (error.message.includes('401') || error.message.includes('Unauthorized')) {
            console.error('⚠️  Authentication failed. Please check your credentials:');
            console.error(`   Username: ${BROWSERSTACK_USERNAME}`);
            console.error('   Access Key: ********\n');
        }
        
        process.exit(1);
    }
})();
