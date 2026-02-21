# 🚀 Quick Start Guide

Get started with Clock Automation in 5 minutes!

## Step 1: Install Dependencies
```bash
npm install
```

## Step 2: Set BrowserStack Credentials

### Windows (PowerShell):
```powershell
$env:BROWSERSTACK_USERNAME="your_username"
$env:BROWSERSTACK_ACCESS_KEY="your_access_key"
```

### Windows (Command Prompt):
```cmd
set BROWSERSTACK_USERNAME=your_username
set BROWSERSTACK_ACCESS_KEY=your_access_key
```

### Linux/Mac:
```bash
export BROWSERSTACK_USERNAME="your_username"
export BROWSERSTACK_ACCESS_KEY="your_access_key"
```

**Or** copy `.env.example` to `.env` and add your credentials:
```bash
cp .env.example .env
```
Then edit `.env` file with your credentials.

## Step 3: Run the Test
```bash
npm test
```

## 🎉 That's it!

The test will:
- Connect to BrowserStack
- Launch Android Clock app
- Set an alarm 2 minutes from now
- Validate and report results

---

## 📊 View Results

After the test runs, check:
- Console output for detailed logs
- [BrowserStack Dashboard](https://app-automate.browserstack.com/) for video recording

---

## 🆘 Need Help?

See the full [README.md](README.md) for:
- Detailed documentation
- Troubleshooting guide
- Best practices
- API references

---

**Happy Testing! 🚀**
