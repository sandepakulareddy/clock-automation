/**
 * ========================================
 * UTILITY HELPER FUNCTIONS
 * ========================================
 * 
 * Reusable utility functions for mobile automation testing
 * 
 * @author Senior Mobile Automation Test Engineer
 */

/**
 * Format time with leading zeros
 * @param {number} value - Time value (hour or minute)
 * @returns {string} Formatted time string
 */
function formatTime(value) {
    return value.toString().padStart(2, '0');
}

/**
 * Get current timestamp for logging
 * @returns {string} Formatted timestamp
 */
function getTimestamp() {
    const now = new Date();
    return `${now.getFullYear()}-${formatTime(now.getMonth() + 1)}-${formatTime(now.getDate())} ` +
           `${formatTime(now.getHours())}:${formatTime(now.getMinutes())}:${formatTime(now.getSeconds())}`;
}

/**
 * Calculate future time by adding minutes
 * @param {number} minutesToAdd - Minutes to add to current time
 * @returns {Object} { hour, minute, hourStr, minuteStr, formatted }
 */
function calculateFutureTime(minutesToAdd = 2) {
    const now = new Date();
    const futureTime = new Date(now.getTime() + minutesToAdd * 60 * 1000);
    
    const hour = futureTime.getHours();
    const minute = futureTime.getMinutes();
    
    return {
        hour: hour,
        minute: minute,
        hourStr: formatTime(hour),
        minuteStr: formatTime(minute),
        formatted: `${formatTime(hour)}:${formatTime(minute)}`,
        timestamp: futureTime.toISOString()
    };
}

/**
 * Convert 24-hour format to 12-hour format with AM/PM
 * @param {number} hour24 - Hour in 24-hour format
 * @returns {Object} { hour12, period }
 */
function convertTo12Hour(hour24) {
    const period = hour24 >= 12 ? 'PM' : 'AM';
    const hour12 = hour24 % 12 || 12;
    return { hour12, period };
}

/**
 * Wait with retry mechanism
 * @param {Function} action - Async function to execute
 * @param {number} maxAttempts - Maximum retry attempts
 * @param {number} delayMs - Delay between retries in milliseconds
 * @returns {Promise<any>} Result of the action
 */
async function retryAction(action, maxAttempts = 3, delayMs = 1000) {
    let lastError;
    
    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
        try {
            return await action();
        } catch (error) {
            lastError = error;
            console.log(`⚠️  Attempt ${attempt} failed: ${error.message}`);
            
            if (attempt < maxAttempts) {
                console.log(`🔄 Retrying in ${delayMs}ms...`);
                await sleep(delayMs);
            }
        }
    }
    
    throw new Error(`Action failed after ${maxAttempts} attempts. Last error: ${lastError.message}`);
}

/**
 * Sleep/delay function
 * @param {number} ms - Milliseconds to sleep
 * @returns {Promise<void>}
 */
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Generate random string (useful for test data)
 * @param {number} length - Length of random string
 * @returns {string} Random string
 */
function generateRandomString(length = 8) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}

/**
 * Log with color and formatting
 * @param {string} message - Message to log
 * @param {string} level - Log level: 'info', 'success', 'warning', 'error'
 */
function logWithFormat(message, level = 'info') {
    const timestamp = getTimestamp();
    const prefix = `[${timestamp}]`;
    
    const symbols = {
        info: 'ℹ️',
        success: '✅',
        warning: '⚠️',
        error: '❌'
    };
    
    console.log(`${prefix} ${symbols[level] || ''} ${message}`);
}

/**
 * Validate element exists with multiple selectors
 * @param {Object} driver - WebdriverIO driver instance
 * @param {Array<string>} selectors - Array of selector strings
 * @param {number} timeout - Timeout in milliseconds
 * @returns {Promise<Object|null>} Element or null
 */
async function findElementWithFallback(driver, selectors, timeout = 10000) {
    for (const selector of selectors) {
        try {
            const element = await driver.$(selector);
            await element.waitForDisplayed({ timeout });
            
            if (await element.isDisplayed()) {
                return element;
            }
        } catch (error) {
            continue; // Try next selector
        }
    }
    return null;
}

/**
 * Take screenshot with custom name
 * @param {Object} driver - WebdriverIO driver instance
 * @param {string} name - Screenshot name
 * @returns {Promise<string>} Base64 screenshot data
 */
async function takeScreenshot(driver, name = 'screenshot') {
    try {
        const screenshot = await driver.takeScreenshot();
        const timestamp = new Date().getTime();
        const filename = `${name}_${timestamp}.png`;
        
        console.log(`📸 Screenshot captured: ${filename}`);
        return screenshot;
    } catch (error) {
        console.error(`Failed to capture screenshot: ${error.message}`);
        return null;
    }
}

/**
 * Get device information from driver
 * @param {Object} driver - WebdriverIO driver instance
 * @returns {Promise<Object>} Device information
 */
async function getDeviceInfo(driver) {
    try {
        const capabilities = driver.capabilities;
        return {
            deviceName: capabilities['appium:deviceName'] || 'Unknown',
            platformName: capabilities.platformName || 'Unknown',
            platformVersion: capabilities['appium:platformVersion'] || 'Unknown',
            automationName: capabilities['appium:automationName'] || 'Unknown'
        };
    } catch (error) {
        console.error(`Failed to get device info: ${error.message}`);
        return {};
    }
}

/**
 * Swipe gesture helper
 * @param {Object} driver - WebdriverIO driver instance
 * @param {string} direction - 'up', 'down', 'left', 'right'
 * @param {number} distance - Swipe distance (0-1, percentage of screen)
 */
async function swipe(driver, direction = 'up', distance = 0.5) {
    const { width, height } = await driver.getWindowSize();
    
    const centerX = width / 2;
    const centerY = height / 2;
    
    const coordinates = {
        up: { x1: centerX, y1: height * (1 - distance), x2: centerX, y2: height * distance },
        down: { x1: centerX, y1: height * distance, x2: centerX, y2: height * (1 - distance) },
        left: { x1: width * (1 - distance), y1: centerY, x2: width * distance, y2: centerY },
        right: { x1: width * distance, y1: centerY, x2: width * (1 - distance), y2: centerY }
    };
    
    const coord = coordinates[direction] || coordinates.up;
    
    await driver.touchPerform([
        { action: 'press', options: { x: coord.x1, y: coord.y1 } },
        { action: 'wait', options: { ms: 500 } },
        { action: 'moveTo', options: { x: coord.x2, y: coord.y2 } },
        { action: 'release' }
    ]);
}

// ========================================
// EXPORTS
// ========================================
module.exports = {
    formatTime,
    getTimestamp,
    calculateFutureTime,
    convertTo12Hour,
    retryAction,
    sleep,
    generateRandomString,
    logWithFormat,
    findElementWithFallback,
    takeScreenshot,
    getDeviceInfo,
    swipe
};
