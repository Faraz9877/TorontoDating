#!/usr/bin/env node
const { existsSync } = require('fs');
const { join } = require('path');
const { spawn } = require('child_process');

const androidDir = join(process.cwd(), 'android');

if (!existsSync(androidDir)) {
  console.error('\nAndroid project not found.');
  console.error('This repository contains only the JavaScript/TypeScript source code.');
  console.error('Generate the native Android project (android/) before running this command.');
  console.error('\nRecommended steps:');
  console.error('  1. Create a new React Native shell with the matching version:');
  console.error('     npx react-native@0.72.6 init TorontoDatingShell');
  console.error('  2. Copy this repository\'s files into the generated shell, replacing the app source.');
  console.error('  3. Re-run npm install and try `npm run android` again.');
  console.error('\nRefer to README.md for more details.\n');
  process.exit(1);
}

const runner = spawn('npx', ['react-native', 'run-android'], {
  stdio: 'inherit',
  shell: process.platform === 'win32',
});

runner.on('exit', (code) => {
  process.exit(code ?? 0);
});
