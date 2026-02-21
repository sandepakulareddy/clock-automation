# 🚀 Android Clock Alarm Automation

Professional Node.js automation script using **Appium**, **WebdriverIO**, and **BrowserStack** to automate the Android system Clock (Alarms & Clock) app.

## 📋 Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Test Scenario](#test-scenario)
- [Troubleshooting](#troubleshooting)
- [Best Practices](#best-practices)

---

## 🎯 Overview

This automation framework tests the Android Clock app by:
- Connecting to BrowserStack cloud devices
- Launching the pre-installed Google Clock app
- Creating an alarm set to current time + 2 minutes
- Validating the alarm was successfully created
- Providing detailed execution reports

**Technology Stack:**
- **Node.js** - Runtime environment
- **WebdriverIO** - Automation framework
- **Appium** - Mobile automation tool
- **UiAutomator2** - Android automation driver
- **BrowserStack** - Cloud testing platform

---

## ✨ Features

✅ **Professional Code Structure** - Clean, maintainable, production-ready code  
✅ **Dynamic Time Calculation** - Automatically sets alarm 2 minutes from current time  
✅ **Explicit Waits** - No hardcoded sleep(), uses `waitForDisplayed()`  
✅ **Robust Error Handling** - Try-catch-finally with graceful cleanup  
✅ **Multiple Selector Strategies** - Fallback selectors for reliability  
✅ **Detailed Logging** - Step-by-step execution logs  
✅ **Execution Summary** - Professional test report at the end  
✅ **Screenshot on Failure** - Automatic screenshot capture on errors  
✅ **Environment Variables** - Secure credential management  

---

## 📦 Prerequisites

Before running this automation, ensure you have:

1. **Node.js** (v14 or higher)
   ```bash
   node --version
   ```

2. **npm** (comes with Node.js)
   ```bash
   npm --version
   ```

3. **BrowserStack Account**
   - Sign up at [BrowserStack.com](https://www.browserstack.com/)
   - Get your Username and Access Key from [Account Settings](https://www.browserstack.com/accounts/settings)

---

## 🔧 Installation

### Step 1: Clone or Download the Project
```bash
cd clock-automation
```

### Step 2: Install Dependencies
```bash
npm install
```

This will install:
- `webdriverio` - WebDriver binding for Node.js
- `appium` - Mobile automation framework

---

## ⚙️ Configuration

### Option 1: Environment Variables (Recommended)

Set your BrowserStack credentials as environment variables:

**Windows (PowerShell):**
```powershell
$env:BROWSERSTACK_USERNAME="your_username"
$env:BROWSERSTACK_ACCESS_KEY="your_access_key"
```

**Windows (Command Prompt):**
```cmd
set BROWSERSTACK_USERNAME=your_username
set BROWSERSTACK_ACCESS_KEY=your_access_key
```

**Linux/Mac:**
```bash
export BROWSERSTACK_USERNAME="your_username"
export BROWSERSTACK_ACCESS_KEY="your_access_key"
```

### Option 2: Direct Configuration

Edit the credentials in [test/clockAlarmTest.js](test/clockAlarmTest.js):

```javascript
'bstack:options': {
    userName: 'YOUR_USERNAME',     // Replace with your BrowserStack username
    accessKey: 'YOUR_ACCESS_KEY',  // Replace with your BrowserStack access key
    buildName: 'Clock Alarm Automation Build',
    sessionName: 'Set Alarm +2 Minutes Test'
}
```

---

## 🚀 Usage

### Run the Test

```bash
npm test
```

Or directly:

```bash
node test/clockAlarmTest.js
```

### Expected Output

```
============================================================
  🚀 STARTING CLOCK ALARM AUTOMATION TEST
============================================================

[STEP 1] Initializing WebDriver connection to BrowserStack...
✅ WebDriver session created successfully

[STEP 2] Waiting for Clock app to launch...
✅ Clock app launched successfully

[STEP 3] Navigating to Alarm tab...
✅ Alarm tab clicked

[STEP 4] Clicking "Add Alarm" button...
✅ Add Alarm button clicked successfully

[STEP 5] Calculating alarm time (Current + 2 minutes)...
⏰ Current Time: 14:35
⏰ Alarm Time (Current + 2 min): 14:37
✅ Alarm time calculated successfully

[STEP 6] Setting alarm hour...
✅ Hour set to: 14

[STEP 7] Setting alarm minute...
✅ Minute set to: 37

[STEP 8] Saving alarm...
✅ Alarm saved successfully

[STEP 9] Validating alarm creation...
✅ Alarm validated successfully! Found alarm with time: 14:37

============================================================
  ✅ TEST PASSED SUCCESSFULLY!
============================================================

[CLEANUP] Closing WebDriver session...
✅ WebDriver session closed successfully

============================================================
             EXECUTION SUMMARY
============================================================
Test Name      : Set Alarm +2 Minutes Test
Platform       : Android
Device         : Google Pixel 6
Status         : PASSED
============================================================
```

---

## 📁 Project Structure

```
clock-automation/
│
├── test/
│   └── clockAlarmTest.js      # Main automation test script
│
├── config/
│   └── config.js               # Configuration settings
│
├── package.json                # Project dependencies
├── .gitignore                  # Git ignore rules
└── README.md                   # This file
```

---

## 🧪 Test Scenario

The automation performs the following steps:

1. **Initialize WebDriver** - Connects to BrowserStack cloud
2. **Launch App** - Opens Google Clock app on the device
3. **Navigate to Alarms** - Clicks the "Alarm" tab
4. **Add New Alarm** - Clicks the "Add Alarm" button (FAB)
5. **Calculate Time** - Computes current time + 2 minutes
6. **Set Hour** - Inputs the calculated hour
7. **Set Minute** - Inputs the calculated minute
8. **Save Alarm** - Clicks "OK" or "Done" button
9. **Validate** - Verifies the alarm appears in the list
10. **Report** - Prints execution summary

---

## 🔍 Troubleshooting

### Common Issues and Solutions

#### 1. **Authentication Failed**
```
Error: Invalid username/access key combination
```
**Solution:** Verify your BrowserStack credentials are correct.

#### 2. **Element Not Found**
```
Error: Unable to locate element
```
**Solution:** The script includes multiple fallback selectors. If this persists, the Clock app UI may have changed. Check BrowserStack session logs.

#### 3. **Session Timeout**
```
Error: Session creation timeout
```
**Solution:** Check your BrowserStack account status and device availability.

#### 4. **App Not Installed**
```
Error: Activity not found
```
**Solution:** Ensure the device has Google Clock app installed. Try a different device or Android version.

### Debugging Tips

1. **View BrowserStack Session:**
   - Go to [BrowserStack App Automate Dashboard](https://app-automate.browserstack.com/)
   - View video recording and logs of your test session

2. **Enable Debug Logs:**
   - In `clockAlarmTest.js`, change `logLevel: 'error'` to `logLevel: 'info'`

3. **Increase Timeouts:**
   - Modify timeout values in `waitForElement()` function if needed

---

## 📚 Best Practices

### ✅ DO:
- Use environment variables for credentials
- Review BrowserStack session videos after test runs
- Use explicit waits instead of fixed delays
- Handle errors gracefully
- Take screenshots on failures

### ❌ DON'T:
- Commit credentials to version control
- Use hardcoded `sleep()` or `pause()` extensively
- Ignore error messages
- Run tests without proper error handling

---

## 🔐 Security Notes

⚠️ **Never commit your BrowserStack credentials to Git!**

- Use environment variables
- Add credentials to `.gitignore`
- Use secret management tools in CI/CD pipelines

---

## 📞 Support

For issues or questions:

1. **BrowserStack Support:** [support.browserstack.com](https://support.browserstack.com/)
2. **WebdriverIO Docs:** [webdriver.io](https://webdriver.io/)
3. **Appium Docs:** [appium.io](https://appium.io/)

---

## 📄 License

This project is licensed under the ISC License.

---

## 👨‍💻 Author

**Senior Mobile Automation Test Engineer**  
Specializing in Appium, WebdriverIO, and Cloud-based Mobile Testing

---

## 🎓 Additional Resources

- [BrowserStack App Automate Documentation](https://www.browserstack.com/docs/app-automate)
- [WebdriverIO API Documentation](https://webdriver.io/docs/api)
- [Appium UiAutomator2 Driver](https://github.com/appium/appium-uiautomator2-driver)
- [Android UiSelector Documentation](https://developer.android.com/reference/androidx/test/uiautomator/UiSelector)

---

**Happy Testing! 🚀**
