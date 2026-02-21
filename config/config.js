/**
 * ========================================
 * AUTOMATION CONFIGURATION FILE
 * ========================================
 * 
 * This file contains configuration settings for the Clock Automation project.
 * Store your BrowserStack credentials and test parameters here.
 * 
 * SECURITY NOTE: Never commit credentials to version control.
 * Use environment variables for sensitive data.
 */

module.exports = {
    // ========================================
    // BROWSERSTACK CREDENTIALS
    // ========================================
    browserstack: {
        // Option 1: Use environment variables (Recommended)
        username: process.env.BROWSERSTACK_USERNAME || 'jaganbunny_Tx0REB',
        accessKey: process.env.BROWSERSTACK_ACCESS_KEY || 'zqieqGpBZpbXi9CkmqiX',
        
        // BrowserStack Hub URL
        hub: 'https://hub-cloud.browserstack.com/wd/hub'
    },

    // ========================================
    // DEVICE CAPABILITIES
    // ========================================
    capabilities: {
        // Platform settings
        platformName: 'Android',
        'appium:automationName': 'UiAutomator2',
        
        // Device configuration (you can modify these)
        'appium:deviceName': 'Google Pixel 6',
        'appium:platformVersion': '13.0',
        
        // Other supported devices:
        // 'appium:deviceName': 'Samsung Galaxy S23',
        // 'appium:platformVersion': '13.0',
        
        // 'appium:deviceName': 'OnePlus 9',
        // 'appium:platformVersion': '11.0',
        
        // App settings
        'appium:appPackage': 'com.google.android.deskclock',
        'appium:appActivity': '.DeskClock',
        'appium:noReset': true,
        
        // BrowserStack specific options
        'bstack:options': {
            buildName: 'Clock Alarm Automation Build',
            sessionName: 'Set Alarm +2 Minutes Test',
            debug: true,
            networkLogs: true
        }
    },

    // ========================================
    // TEST TIMEOUTS (in milliseconds)
    // ========================================
    timeouts: {
        implicit: 10000,      // Implicit wait timeout
        explicit: 15000,      // Explicit wait timeout
        pageLoad: 30000,      // Page load timeout
        script: 20000         // Script execution timeout
    },

    // ========================================
    // TEST PARAMETERS
    // ========================================
    testParams: {
        alarmOffsetMinutes: 2,  // Minutes to add to current time for alarm
        retryAttempts: 3,       // Number of retry attempts for flaky operations
        screenshotOnFailure: true
    },

    // ========================================
    // LOGGING CONFIGURATION
    // ========================================
    logging: {
        level: 'info',  // Options: 'error', 'warn', 'info', 'debug', 'trace'
        enableConsole: true,
        enableFile: false,
        logFilePath: './logs/automation.log'
    }
};
