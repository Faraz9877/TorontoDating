/**
 * TorontoDating - A specialized dating app for Toronto residents
 * Entry point for React Native application
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';

// Register the main application component
AppRegistry.registerComponent(appName, () => App);