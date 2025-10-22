# 🍁 Toronto Dating

> **Find Love in the 6ix** - The premier dating app designed exclusively for Toronto residents

[![React Native](https://img.shields.io/badge/React%20Native-0.72.6-blue.svg)](https://reactnative.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-4.8.4-blue.svg)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

## 🌟 Features

### 🚇 **TTC Integration**
- Match with people on your daily commute route
- Find connections on Line 1 (Yonge-University), Line 2 (Bloor-Danforth), and streetcar routes
- Commute-based compatibility scoring

### 🏙️ **Neighborhood Matching**
- Connect with locals in your Toronto neighborhood
- Featured areas: King West, Liberty Village, Distillery District, Kensington Market
- Distance-based matching within the GTA

### 🍁 **Toronto Venues & Events**
- Discover date spots from CN Tower to Harbourfront
- Integration with Toronto events (Winterlicious, CNE, TIFF)
- Local restaurant and bar recommendations

### ❄️ **Seasonal Features**
- Winter date ideas (skating at Nathan Phillips Square)
- Summer activities (Toronto Islands, outdoor concerts)
- Fall experiences (High Park cherry blossoms)

### 📱 **Modern Dating Experience**
- Intuitive card-based swiping interface
- Real-time messaging system
- Photo verification for authentic profiles
- Dark mode support

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- React Native CLI
- Android Studio (for Android development)
- Xcode (for iOS development, macOS only)
- CocoaPods (for iOS dependencies)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Faraz9877/TorontoDating.git
   cd TorontoDating
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **iOS Setup** (macOS only)
   ```bash
   cd ios && pod install && cd ..
   ```

4. **Start Metro bundler**
   ```bash
   npm start
   ```

5. **Run the app**
   
   For Android:
   ```bash
   npm run android
   ```
   
   For iOS:
   ```bash
   npm run ios
   ```

## 🏗️ Project Structure

```
TorontoDating/
├── src/
│   ├── components/          # Reusable UI components
│   ├── screens/            # App screens
│   │   ├── WelcomeScreen.tsx
│   │   ├── AuthScreen.tsx
│   │   └── HomeScreen.tsx
│   ├── services/           # API and external services
│   ├── utils/              # Utility functions
│   ├── types/              # TypeScript type definitions
│   ├── constants/          # App constants
│   ├── hooks/              # Custom React hooks
│   ├── navigation/         # Navigation configuration
│   └── assets/             # Images, fonts, etc.
├── android/                # Android-specific code
├── ios/                    # iOS-specific code
├── App.tsx                 # Main app component
├── index.js               # App entry point
├── package.json           # Dependencies and scripts
└── tsconfig.json          # TypeScript configuration
```

## 🎨 Design System

### Color Palette
- **Primary**: Toronto Blue (`#16537e`)
- **Secondary**: Maple Leaf Red (`#ff6b6b`)
- **Accent**: CN Tower Orange (`#ee5a24`)
- **Background**: Snow White (`#ffffff`) / Midnight (`#1a1a1a`)

### Typography
- **Headers**: Bold, 24-36px
- **Body**: Regular, 14-16px
- **Captions**: Light, 12px

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
# Firebase Configuration
FIREBASE_API_KEY=your_firebase_api_key
FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
FIREBASE_PROJECT_ID=your_firebase_project_id

# Google Maps API
GOOGLE_MAPS_API_KEY=your_google_maps_api_key

# TTC API (if available)
TTC_API_KEY=your_ttc_api_key
```

### Firebase Setup

1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
2. Enable Authentication (Phone Number)
3. Enable Firestore Database
4. Enable Storage
5. Add your configuration to the `.env` file

## 📱 Screens Overview

### Welcome Screen
- Toronto-themed onboarding
- Feature highlights with local context
- "Find Love in the 6ix" branding

### Authentication Screen
- Multi-step phone verification
- Canadian phone number format
- Profile completion form

### Home Screen
- Card-based profile discovery
- Toronto neighborhood display
- TTC route information
- Like/Pass/Super Like actions

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests with coverage
npm run test:coverage

# Run linting
npm run lint
```

## 📦 Building for Production

### Android
```bash
npm run build:android
```

### iOS
```bash
npm run build:ios
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Toronto Transit Commission for inspiration
- City of Toronto for neighborhood data
- React Native community for excellent tooling
- Toronto dating scene for being awesome! 🇨🇦

## 📞 Support

For support, email faraz.shahsavan@gmail.com or create an issue on GitHub.

---

**Made with ❤️ in Toronto, Canada** 🍁