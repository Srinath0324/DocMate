# DocMate

<div align="center">

**A comprehensive healthcare appointment booking mobile application**

Built with React Native | Seamless Patient Experience

</div>

---

## 📋 Overview

**DocMate** is a feature-rich mobile platform that enables patients to discover, book, and manage medical appointments with healthcare professionals. The app provides a seamless experience for finding doctors, hospitals, and laboratories while offering administrators powerful management tools.

---

## 🏥 Features

| Feature                           | Description                                             |
| --------------------------------- | ------------------------------------------------------- |
| 🔍 **Doctor Discovery**           | Search doctors by specialty, location, and availability |
| 🏢 **Hospital & Clinic Profiles** | Access comprehensive facility information               |
| 📅 **Appointment Booking**        | Schedule appointments with healthcare providers         |
| 🧪 **Lab Services**               | Book diagnostic tests and laboratory services           |
| ⏰ **Time Slot Management**       | Real-time availability checking and booking             |
| 💳 **Payment Integration**        | Secure in-app payment processing                        |
| 📊 **Appointment History**        | View past and upcoming appointments                     |
| ⭐ **Reviews & Ratings**          | Rate and review doctors and facilities                  |
| 👤 **Profile Management**         | Manage medical information and preferences              |
| 🛠️ **Admin Dashboard**            | Healthcare provider administrative tools                |

---

## ⚙️ Setup & Installation

### Prerequisites

```
✓ Node.js (v14+) and npm
✓ React Native CLI
✓ Android Studio
✓ Java JDK 17
✓ Android SDK
```

---

### Quick Start

#### 1️⃣ Install Dependencies

```bash
npm install
```

#### 2️⃣ Configure Android SDK

Navigate to the Android folder and set up the SDK path:

```powershell
cd android
```

Create/update `local.properties` file:

```powershell
$contents = "sdk.dir=C:\Users\<your-username>\AppData\Local\Android\Sdk"
Set-Content -Path .\local.properties -Value $contents -Encoding UTF8
Get-Content .\local.properties
```

> **Note:** Replace `<your-username>` with your actual Windows username.

#### 3️⃣ Start Development

**Terminal 1 - Start Metro Bundler:**

```bash
npx react-native start
```

**Terminal 2 - Run on Android:**

```bash
npx react-native run-android
```

---

## 🔧 Troubleshooting

### Java 17 Environment Setup (Temporary Method)

If you encounter Java-related build errors, set up the environment variables :

```powershell
# Set Java Home
$env:JAVA_HOME = 'C:\Program Files\Java\jdk-17'
$env:Path = "$env:JAVA_HOME\bin;" + $env:Path
java -version
```
> **Note:** This jdk 17 environment will only be avaiable in the current terminal .

### Android SDK Configuration

Configure Android SDK environment variables:

```powershell
# Set Android SDK paths
$env:ANDROID_SDK_ROOT = "C:\Users\<your-username>\AppData\Local\Android\Sdk"
$env:ANDROID_HOME = "C:\Users\<your-username>\AppData\Local\Android\Sdk"
$env:Path = "$env:ANDROID_SDK_ROOT\platform-tools;$env:ANDROID_SDK_ROOT\emulator;" + $env:Path
```

### Clean Build

If you experience build issues, clean and refresh dependencies:

```powershell
cd android
.\gradlew clean --refresh-dependencies
cd ..
```

---

## ℹ️ Important Notes

> ⚠️ **Environment Variables:** Ensure all environment variables are correctly configured before building.

> 🔗 **Compatibility:** Verify your Android SDK path and Java version match React Native requirements.

> 🖥️ **Platform:** This setup guide is for **Windows OS**. For macOS or Linux, adjust paths accordingly.

---

## 📱 Supported Platforms

- Android (Primary)
- iOS (Support available)

---

## 📝 License

[Add your license information here]

---

## 🤝 Contributing

Contributions are welcome! Please follow the project's coding standards and submit pull requests for review.
