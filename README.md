# UniPocket


## 📱 Introduction
**UniPocket** is a mobile application designed to enhance university life by streamlining facility reporting, merit tracking, and facility searches. It integrates Firebase authentication, Google Maps, and a seamless user experience to assist students in managing their campus activities efficiently.

## ✨ Features

### 🔑 Authentication
- Firebase Authentication for secure login and registration.
- Register with an email and password.
- Email verification required before login.
- Password reset via email.

### 🏢 Facility Report
- Report campus facility issues with photo uploads.
- View report history and track the reporting status.
- Provide ratings for resolved reports.

### 🎖 Merit System
- Scan QR codes or upload them from the gallery to record merit points.
- View merit history and total scanned activities.
- Room selection based on merit ranking priority.

### 🔍 Facility Search
- Integrated with Google Maps for real-time location tracking.
- Search and filter facilities on campus.
- Tap on facility markers to open Google Maps for navigation.

### 🛠 User Data Management
- Update user information.
- Change passwords securely.

## 🛠 Tech Stack
- **Frontend:** React Native, Expo
- **Backend:** Express, Firebase
- **APIs & Libraries:** Axios, Google Maps API, ImageKit

## 📌 Project Links
- **Figma (Design Overview):** [Figma Prototype](https://www.figma.com/design/PQ33omQXwXSuqrOgO6eGve/Untitled?node-id=0-1&p=f&t=TXRgF1mIHP2DmMkx-0)
- **APK (Android Only):** [Download APK](https://expo.dev/accounts/ni02/projects/UniResidence/builds/a27e4353-704a-46d5-ba5b-b79b2e8372ce)
- **Video Demo:** [YouTube] [Demo Video](https://youtube.com/shorts/vyQA1kxteLg)
- **Web-based Staff Management (UniPocket Web):** [GitHub Repository](https://github.com/ni030/UniPocketWeb)

## 🚀 Installation & Setup

### Prerequisites
- Node.js & npm installed
- Expo CLI installed (`npm install -g expo-cli`)
- Firebase project set up

### Clone the Repository
```sh
git clone https://github.com/yourusername/UniPocket.git
cd UniPocket
```

### Install Dependencies
```sh
Both
npm install
```

### Set Up Environment Variables
Create a `.env` file in the root directory and configure the Firebase API keys.
```sh
Frontend
FIREBASE_AUTH_APIKEY=your_firebase_api_key
FIREBASE_API=your_firebase_function_api_url
GOOGLE_MAPS_API_KEY=your_google_maps_api_key

Backend
FIREBASE_DATABASE_URL=your_firebase_database_url
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
```
### Run the Application
```sh
Frontend
npx expo start

Backend
node server.js
```

## 🤝 Contributors
- **LIM SI NI** - [GitHub](https://github.com/ni030)  <!-- Replace with actual contributors -->



