# 🍁 Toronto Dating

> **Find Love in the 6ix** – A Toronto-first dating experience with curated neighbourhood vibes, TTC-inspired conversation starters, and polished UI flows for onboarding, discovery, messaging, and profile management.

[![React Native](https://img.shields.io/badge/React%20Native-0.72.6-blue.svg)](https://reactnative.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-4.8.4-blue.svg)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

## 🌟 Features
- **Onboarding & Authentication** – Guided, multi-step sign-up built for Canadian phone numbers and profile enrichment.
- **Toronto-flavoured discovery** – Swipe-ready cards highlighting TTC lines, neighbourhood callouts, and curated interest tags.
- **Matches hub** – Filterable list of matches with quick search, activity chips, and conversation previews.
- **Rich chat prototype** – Venue and TTC prompts, smart responses, and animated typing indicators to keep conversations lively.
- **Profile management** – Edit personal details, preferences, interests, and notification settings in a single screen.
- **Dark theme focus** – Consistent colour palette optimised for OLED devices and evening use.

## 🧰 Tech Stack
- React 18.2 + React Native 0.72.x (TypeScript-first setup)
- React Navigation 6 (stack + tabs)
- React Native Gesture Handler, Screens, and Safe Area Context
- Linear gradient styling via `react-native-linear-gradient`
- Jest + React Native Testing Library ready (configuration only)
- ESLint + Prettier for linting and formatting

## 🛠️ Prerequisites
Before installing dependencies, make sure your workstation matches the [official React Native environment setup](https://reactnative.dev/docs/environment-setup) for the **React Native CLI** workflow:

- **Node.js** 16.20+ (Node 18 LTS recommended) and npm 8+
- **Watchman** (macOS) for fast rebuilds
- **Java Development Kit (JDK) 11** and **Android Studio** with an Android SDK + virtual device
- **Xcode 14+** with command-line tools (macOS only) and **CocoaPods** (`sudo gem install cocoapods`)
- **Physical devices** require enabling USB debugging (Android) or using Xcode’s Devices window (iOS)

> 💡 Run `npx react-native doctor` after installing tooling to confirm the environment is ready.

## 🚀 Getting Started
1. **Clone the repository**
   ```bash
   git clone https://github.com/Faraz9877/TorontoDating.git
   cd TorontoDating
   ```
2. **Install JavaScript dependencies**
   ```bash
   npm install
   ```
3. **Install iOS pods (macOS only, once your `ios/` folder exists)**
   ```bash
   npx pod-install ios
   ```
4. **Populate local configuration (optional)** – Create a `.env` file using the template in the [Configuration](#-configuration) section if you plan to wire the UI to live services.

> 📦 **Platform projects** – The repository focuses on the JavaScript/TypeScript application layer. If you are starting from a clean clone, generate native shells (the `android/` and `ios/` folders) by creating a new React Native project with the same React Native version (`npx react-native@0.72.6 init TorontoDatingShell`) and copying this repo’s source files into it, or reuse an existing native container.

## ▶️ Running the Application
All commands assume you have Metro running in one terminal and platform builds in another.

1. **Start Metro bundler**
   ```bash
   npm start
   ```
   Metro should display `Done` once the bundler is ready. Leave this process running.

2. **Launch on Android**
   ```bash
   npm run android
   ```
   Requirements:
   - Android emulator running, or a USB device with debugging enabled.
   - `ANDROID_HOME`/SDK tools available in your shell.
   - If using a real device, forward Metro with `adb reverse tcp:8081 tcp:8081`.

3. **Launch on iOS (macOS only)**
   ```bash
   npm run ios
   ```
   Requirements:
   - Xcode with a simulator (e.g. iPhone 15) installed.
   - `npx pod-install` must have succeeded beforehand.

4. **Reloading & debugging**
   - Press `r` in the Metro terminal (or `Command + r` in the simulator) to reload.
   - Use the React Native Dev Menu (`Cmd + d` on iOS simulator, `Cmd + m` on Android emulator) for debugging tools and performance overlays.

## 🧪 Testing & Quality Checks
Run these commands from the repository root:

| Command | Description |
| --- | --- |
| `npm test` | Executes Jest in watch mode (press `a` to run all tests once). |
| `npm run test:coverage` | Generates a coverage report for the current test suite. |
| `npm run lint` | Runs ESLint across `.js`, `.jsx`, `.ts`, and `.tsx` files. |

> ✅ There are currently no automated tests checked in; the commands above confirm that the testing toolchain is wired correctly and ready for future test suites.

## 🗂️ Project Structure
```
TorontoDating/
├── App.tsx                # Root component with navigation containers
├── index.js               # Entry point registered with AppRegistry
├── src/
│   └── screens/           # Feature screens (Auth, Chat, Home, Matches, Profile, Welcome)
├── package.json           # Scripts and dependency manifest
├── tsconfig.json          # TypeScript configuration
└── README.md              # Project documentation
```

## ⚙️ Configuration
Environment variables allow you to connect the UI to real backend services when you are ready:

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

Store secrets in a `.env` file and load them at runtime with a library such as `react-native-dotenv` or `react-native-config` (not yet included).

## 🛣️ Production Readiness Checklist
The current codebase is a polished prototype that still relies on mocked data and client-side placeholders. To ship a production-ready release, plan to tackle the following areas:

1. **Backend integration** – Replace mock profiles, matches, and chat data with live APIs (e.g., Firebase, Supabase, or a custom backend) and implement pagination/caching.
2. **Authentication hardening** – Add secure phone/SMS verification, session persistence, token refresh, and account recovery flows.
3. **Data storage & privacy** – Implement encrypted at-rest storage for sensitive data, GDPR/CPPA compliance tooling, and user data export/deletion workflows.
4. **Real-time messaging** – Integrate a production-grade messaging service with delivery status, typing indicators, push notifications, and offline resilience.
5. **Permissions & native capabilities** – Wire up image capture, media library access, location services, and push notifications with clear permission prompts and fallbacks.
6. **Design system polish** – Finalise typography, spacing, iconography, and ensure assets (app icons, splash screens) meet App Store/Play Store requirements.
7. **Accessibility & localisation** – Audit for VoiceOver/TalkBack support, high-contrast themes, scalable fonts, and add localisation infrastructure for French/English markets.
8. **Automated testing** – Build unit, integration, and E2E suites (Detox/Playwright), enforce coverage thresholds, and add snapshot tests for critical screens.
9. **CI/CD & release automation** – Configure continuous integration (GitHub Actions, CircleCI) for lint/test/build, set up Fastlane or EAS for signed builds, and add crash/analytics tooling (Sentry, Firebase Analytics).
10. **Monitoring & observability** – Add runtime logging, error boundaries, performance profiling, and real-time monitoring dashboards.
11. **Legal & compliance** – Draft Terms of Service/Privacy Policy, age verification, content moderation workflows, and incident response procedures.
12. **Scalability & security review** – Pen-test the API, secure third-party integrations, rate limit critical endpoints, and plan for load testing ahead of launch.

Track progress against this checklist to transition from prototype to a reliable, market-ready application.

## 🤝 Contributing
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m "feat: add amazing feature"`)
4. Run quality checks (`npm run lint && npm test`)
5. Push to the branch (`git push origin feature/amazing-feature`)
6. Open a Pull Request describing your changes and testing strategy

## 📄 License
This project is licensed under the MIT License – see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments
- Toronto Transit Commission for city-wide inspiration
- City of Toronto open data initiatives
- The React Native community for its tooling and ecosystem

## 📞 Support
For support, email **faraz.shahsavan@gmail.com** or create a GitHub issue.

---

**Made with ❤️ in Toronto, Canada** 🍁
