#!/usr/bin/env node

const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const args = process.argv.slice(2);
const projectName = args[0];

if (!projectName) {
  console.error('❌ Please provide a project name:');
  console.error('👉 Example: npx create-my-electron-app my-project-name');
  process.exit(1);
}

console.log(`🚀 Creating project "${projectName}"...`);

const repoUrl = 'https://github.com/atiliodev/example-app';

try {
  execSync(`npx degit ${repoUrl} ${projectName}`, { stdio: 'inherit' });
  console.log('✅ Project copied successfully!');

  const projectPath = path.join(process.cwd(), projectName);
  process.chdir(projectPath);

  if (fs.existsSync('package.json')) {
    console.log('📦 Installing dependencies...');
    execSync('npm install', { stdio: 'inherit' });
  }

  console.log('\n🎉 Project is ready!');
  console.log(`👉 cd ${projectName}`);
  console.log('👉 npm start');
} catch (error) {
  console.error('❌ An error occurred:', error.message);
}
