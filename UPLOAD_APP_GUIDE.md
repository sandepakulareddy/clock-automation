# 📱 BrowserStack App Upload Guide

## ⚠️ IMPORTANT: BrowserStack Requires App Upload

BrowserStack App Automate requires you to upload an APK file before testing. Even for system apps like Clock, you need to upload an app first.

---

## 🎯 Two Approaches for Testing System Clock App

### **Approach 1: Upload Clock APK (Recommended)**
1. Extract the Clock APK from an Android device
2. Upload it to BrowserStack
3. Use the returned app ID

### **Approach 2: Dummy App + Launch Clock**
1. Upload any simple Android APK (like a "Hello World" app)
2. Use `appPackage` and `appActivity` to launch Clock instead

---

## 📤 How to Upload App to BrowserStack

### Method 1: Using BrowserStack Dashboard (Easiest)
1. Go to: https://app-automate.browserstack.com/dashboard/v2/
2. Click **"Upload"** button
3. Select your APK file
4. After upload, you'll get an **app URL** like:
   ```
   bs://c8ddcb5649a8280ca800075bfd8f151115bba6b3
   ```
5. Copy this ID

### Method 2: Using cURL (Command Line)
```bash
curl -u "jaganbunny_Tx0REB:zqieqGpBZpbXi9CkmqiX" \
  -X POST "https://api-cloud.browserstack.com/app-automate/upload" \
  -F "file=@/path/to/your/app.apk"
```

**PowerShell version:**
```powershell
$username = "jaganbunny_Tx0REB"
$accessKey = "zqieqGpBZpbXi9CkmqiX"
$apkPath = "C:\path\to\your\app.apk"

$credentials = [Convert]::ToBase64String([Text.Encoding]::ASCII.GetBytes("${username}:${accessKey}"))

Invoke-RestMethod -Uri "https://api-cloud.browserstack.com/app-automate/upload" `
  -Method Post `
  -Headers @{Authorization = "Basic $credentials"} `
  -Form @{file = Get-Item $apkPath}
```

**Response:**
```json
{
  "app_url": "bs://c8ddcb5649a8280ca800075bfd8f151115bba6b3",
  "custom_id": "MyApp",
  "shareable_id": "username/MyApp"
}
```

---

## 🔧 Update Your Test Script

After uploading, update the `app` capability in [test/clockAlarmTest.js](../test/clockAlarmTest.js):

```javascript
'bstack:options': {
    userName: 'jaganbunny_Tx0REB',
    accessKey: 'zqieqGpBZpbXi9CkmqiX',
    deviceName: 'Google Pixel 6',
    osVersion: '13.0',
    app: 'bs://YOUR_APP_ID_HERE',  // Replace with your app ID
    buildName: 'Clock Alarm Automation Build',
    sessionName: 'Set Alarm +2 Minutes Test'
}
```

**Or use environment variable:**
```powershell
$env:BROWSERSTACK_APP_ID="bs://c8ddcb5649a8280ca800075bfd8f151115bba6b3"
npm test
```

---

## 📥 Getting Clock APK

### Option A: Download from APKMirror
1. Go to: https://www.apkmirror.com/
2. Search for "Google Clock"
3. Download the APK
4. Upload to BrowserStack

### Option B: Extract from Android Device (requires ADB)
```bash
# List installed packages
adb shell pm list packages | grep clock

# Find the APK path
adb shell pm path com.google.android.deskclock

# Pull the APK
adb pull /system/priv-app/DeskClock/DeskClock.apk clock.apk
```

### Option C: Use a Dummy App (Quick Start)
If you just want to test quickly:
1. Create a simple "Hello World" Android app
2. Upload it to BrowserStack
3. The test will still launch Clock using `appPackage`/`appActivity`

---

## 🚀 Quick Start Script

I've created a helper script to upload your app:

```powershell
# Run from project directory
node scripts/uploadApp.js path/to/your/app.apk
```

---

## ✅ After Upload Checklist

- [ ] App uploaded to BrowserStack
- [ ] Received app_url (starts with `bs://`)
- [ ] Updated test script with app ID
- [ ] Run test: `npm test`

---

## 🆘 Alternative: Test Without BrowserStack

If uploading an app is not feasible, you can:

1. **Use Local Appium Server:**
   - Run Appium locally
   - Connect to a real device or emulator
   - Test without app upload requirement

2. **Use Different Cloud Provider:**
   - LambdaTest
   - Sauce Labs
   - AWS Device Farm
   - Some support system app testing differently

---

## 📞 Need Help?

- **BrowserStack Support:** https://support.browserstack.com/
- **Upload API Docs:** https://www.browserstack.com/docs/app-automate/api-reference/appium/apps#upload-an-app

---

**Next Step:** Upload an APK to BrowserStack and update the `app` capability in your test! 🎯
