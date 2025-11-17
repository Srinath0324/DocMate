# DocMate

**DocMate** is a comprehensive healthcare appointment booking mobile application built with **React Native**. It provides a seamless platform for patients to **find, book, and manage medical appointments** with doctors, hospitals, and laboratories.

---

## 🏥 Features

**DocMate** offers a wide range of features for both patients and healthcare providers:

- **Doctor Discovery**: Search for doctors by specialty, location, and availability.
- **Hospital & Clinic Profiles**: Access detailed information about medical facilities.
- **Appointment Booking**: Schedule appointments with doctors and healthcare providers.
- **Lab Services**: Book laboratory tests and other diagnostic services.
- **Time Slot Management**: Check real-time availability and book time slots.
- **Payment Integration**: Securely pay for appointments within the app.
- **Appointment History**: Track past and upcoming appointments.
- **Reviews & Ratings**: View and submit reviews for doctors and hospitals.
- **Profile Management**: Manage patient profiles and personal medical information.
- **Admin Dashboard**: Provides healthcare providers with administrative tools.

---

## ⚙️ Setup & Installation

### 1. Prerequisites

- Node.js and npm
- React Native CLI
- Android Studio (for Android development)
- Java JDK 17
- Android SDK

---

### 2. Configure Android SDK

1. Navigate to the Android folder:


cd android

2. Create or update local.properties file:


$contents = "sdk.dir=C:\\Users\\<user-name>\\AppData\\Local\\Android\\Sdk"
Set-Content -Path .\local.properties -Value $contents -Encoding UTF8
Get-Content .\local.properties

Replace <user-name> with your Windows username.

3. Install Dependencies

npm install

4. Start Metro Bundler


npx react-native start

5. Run on Android

npx react-native run-android


### Troubleshooting

Java 17 Setup (Temporary Method)
2. Set Java environment variables in the single terminal:


$env:JAVA_HOME = 'C:\Program Files\Java\jdk-17'
$env:Path = "$env:JAVA_HOME\bin;" + $env:Path
java -version


2. Configure Android SDK environment variables:


$env:ANDROID_SDK_ROOT = "C:\Users\<user-name>\AppData\Local\Android\Sdk"
$env:ANDROID_HOME = "C:\Users\<user-name>\AppData\Local\Android\Sdk"
$env:Path = "$env:ANDROID_SDK_ROOT\platform-tools;$env:ANDROID_SDK_ROOT\emulator;" + $env:Path

3. Clean and refresh Gradle dependencies:


cd android
.\gradlew clean --refresh-dependencies
cd ..

## Notes
Ensure all environment variables are correctly set before building the project.

Always verify your Android SDK path and Java version for compatibility with React Native.

This setup is tested on Windows OS; for macOS or Linux, paths and commands will differ.


