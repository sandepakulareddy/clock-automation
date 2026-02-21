/**
 * ========================================
 * EXAMPLE: RUNNING TESTS WITH DIFFERENT CONFIGURATIONS
 * ========================================
 * 
 * This file demonstrates various ways to run the Clock automation test
 * with different configurations and parameters.
 */

const { remote } = require('webdriverio');

// ========================================
// EXAMPLE 1: Basic Test Run
// ========================================

async function basicTestExample() {
    console.log('Running basic test...');
    
    // Just run with default configuration
    const { runClockAlarmTest } = require('./test/clockAlarmTest');
    await runClockAlarmTest();
}

// ========================================
// EXAMPLE 2: Test with Different Device
// ========================================

async function differentDeviceExample() {
    console.log('Running test on Samsung Galaxy S23...');
    
    const capabilities = {
        platformName: 'Android',
        'appium:automationName': 'UiAutomator2',
        'appium:deviceName': 'Samsung Galaxy S23',  // Different device
        'appium:platformVersion': '13.0',
        'appium:appPackage': 'com.google.android.deskclock',
        'appium:appActivity': '.DeskClock',
        'appium:noReset': true,
        'bstack:options': {
            userName: process.env.BROWSERSTACK_USERNAME,
            accessKey: process.env.BROWSERSTACK_ACCESS_KEY,
            buildName: 'Clock Automation - Samsung Device',
            sessionName: 'Samsung Galaxy S23 Test'
        }
    };
    
    // Use these capabilities with remote()
    const driver = await remote({
        protocol: 'https',
        hostname: 'hub-cloud.browserstack.com',
        path: '/wd/hub',
        port: 443,
        capabilities: capabilities
    });
    
    // Your test logic here...
    
    await driver.deleteSession();
}

// ========================================
// EXAMPLE 3: Multiple Alarms Test
// ========================================

async function multipleAlarmsExample() {
    console.log('Setting multiple alarms...');
    
    const alarmsToSet = [
        { offset: 2, label: 'First Alarm' },
        { offset: 5, label: 'Second Alarm' },
        { offset: 10, label: 'Third Alarm' }
    ];
    
    // Loop through and set each alarm
    for (const alarm of alarmsToSet) {
        console.log(`Setting alarm: ${alarm.label} (${alarm.offset} minutes from now)`);
        // Implement alarm setting logic here
    }
}

// ========================================
// EXAMPLE 4: Parallel Test Execution
// ========================================

async function parallelTestExample() {
    console.log('Running tests in parallel on multiple devices...');
    
    const devices = [
        { name: 'Google Pixel 6', version: '13.0' },
        { name: 'Samsung Galaxy S23', version: '13.0' },
        { name: 'OnePlus 9', version: '11.0' }
    ];
    
    // Run tests in parallel
    const testPromises = devices.map(device => {
        console.log(`Starting test on: ${device.name}`);
        // Return test promise
        // return runTestOnDevice(device);
    });
    
    await Promise.all(testPromises);
    console.log('All parallel tests completed!');
}

// ========================================
// EXAMPLE 5: Test with Custom Time Offset
// ========================================

function calculateCustomAlarmTime(minutesOffset) {
    const now = new Date();
    const futureTime = new Date(now.getTime() + minutesOffset * 60 * 1000);
    
    return {
        hour: futureTime.getHours(),
        minute: futureTime.getMinutes(),
        formatted: `${futureTime.getHours().toString().padStart(2, '0')}:${futureTime.getMinutes().toString().padStart(2, '0')}`
    };
}

// ========================================
// EXAMPLE 6: Test with Error Recovery
// ========================================

async function testWithRetryExample() {
    const maxRetries = 3;
    let attempt = 0;
    let success = false;
    
    while (attempt < maxRetries && !success) {
        attempt++;
        console.log(`Test attempt ${attempt} of ${maxRetries}`);
        
        try {
            // Run your test
            const { runClockAlarmTest } = require('./test/clockAlarmTest');
            await runClockAlarmTest();
            success = true;
            console.log('✅ Test passed!');
        } catch (error) {
            console.error(`❌ Attempt ${attempt} failed: ${error.message}`);
            
            if (attempt < maxRetries) {
                console.log('Retrying in 5 seconds...');
                await new Promise(resolve => setTimeout(resolve, 5000));
            }
        }
    }
    
    if (!success) {
        console.error('❌ Test failed after all retry attempts');
        process.exit(1);
    }
}

// ========================================
// EXAMPLE 7: Environment-Specific Configuration
// ========================================

function getEnvironmentConfig() {
    const environment = process.env.TEST_ENV || 'production';
    
    const configs = {
        development: {
            buildName: 'DEV - Clock Automation',
            debug: true,
            networkLogs: true
        },
        staging: {
            buildName: 'STAGING - Clock Automation',
            debug: true,
            networkLogs: false
        },
        production: {
            buildName: 'PROD - Clock Automation',
            debug: false,
            networkLogs: false
        }
    };
    
    return configs[environment] || configs.production;
}

// ========================================
// EXAMPLE 8: Data-Driven Testing
// ========================================

async function dataDrivenTestExample() {
    console.log('Running data-driven tests...');
    
    const testData = [
        { device: 'Google Pixel 6', version: '13.0', alarmOffset: 2 },
        { device: 'Samsung Galaxy S23', version: '13.0', alarmOffset: 5 },
        { device: 'OnePlus 9', version: '11.0', alarmOffset: 10 }
    ];
    
    for (const data of testData) {
        console.log(`\nTest Case: ${data.device}`);
        console.log(`  - Android Version: ${data.version}`);
        console.log(`  - Alarm Offset: ${data.alarmOffset} minutes`);
        
        // Run test with this data
        // await runTestWithData(data);
    }
}

// ========================================
// EXPORTS (if needed in other files)
// ========================================

module.exports = {
    basicTestExample,
    differentDeviceExample,
    multipleAlarmsExample,
    parallelTestExample,
    calculateCustomAlarmTime,
    testWithRetryExample,
    getEnvironmentConfig,
    dataDrivenTestExample
};

// ========================================
// USAGE INSTRUCTIONS
// ========================================

/*

TO RUN THESE EXAMPLES:

1. Basic Test:
   node examples.js

2. With Custom Function:
   const examples = require('./examples');
   examples.basicTestExample();

3. With Environment Variable:
   SET TEST_ENV=staging
   node test/clockAlarmTest.js

4. With Custom Device (modify capabilities in clockAlarmTest.js):
   - Change 'appium:deviceName'
   - Change 'appium:platformVersion'

5. Multiple Tests in Sequence:
   for device in ("Pixel 6" "Galaxy S23" "OnePlus 9"); do
     node test/clockAlarmTest.js
   done

*/
