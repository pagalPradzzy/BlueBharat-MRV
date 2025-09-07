#!/usr/bin/env node

// Prepare for Git commit - Blue Carbon MRV Dashboard
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Preparing Blue Carbon MRV Dashboard for Git commit...\n');

// Check if git is initialized
try {
  execSync('git status', { stdio: 'ignore' });
} catch (error) {
  console.log('❌ Git repository not initialized');
  console.log('🔧 Initializing Git repository...');
  execSync('git init');
  console.log('✅ Git repository initialized\n');
}

// Check for sensitive files
console.log('🔒 Checking for sensitive files...');
const sensitivePatterns = [
  '.env',
  '.env.local',
  '*.key',
  '*.pem',
  '*.p12',
  'config/secrets*'
];

let foundSensitiveFiles = false;
sensitivePatterns.forEach(pattern => {
  try {
    const files = execSync(`find . -name "${pattern}" -not -path "./node_modules/*" 2>/dev/null || true`, { encoding: 'utf8' });
    if (files.trim()) {
      console.log(`⚠️  Found sensitive files: ${files.trim()}`);
      foundSensitiveFiles = true;
    }
  } catch (error) {
    // Ignore errors in file search
  }
});

if (!foundSensitiveFiles) {
  console.log('✅ No sensitive files found in commit');
}

// Run linting
console.log('\n📝 Running ESLint...');
try {
  execSync('npm run lint', { stdio: 'inherit' });
  console.log('✅ Linting passed');
} catch (error) {
  console.log('❌ Linting failed. Run "npm run lint:fix" to fix issues');
}

// Run formatting check
console.log('\n🎨 Checking code formatting...');
try {
  execSync('npm run format:check', { stdio: 'ignore' });
  console.log('✅ Code formatting is correct');
} catch (error) {
  console.log('⚠️  Code formatting issues found. Run "npm run format" to fix');
}

// Run tests
console.log('\n🧪 Running tests...');
try {
  execSync('npm run test:ci', { stdio: 'inherit' });
  console.log('✅ All tests passed');
} catch (error) {
  console.log('❌ Tests failed. Please fix failing tests before committing');
}

// Run security audit
console.log('\n🔒 Running security audit...');
try {
  execSync('npm run security:audit', { stdio: 'inherit' });
  console.log('✅ Security audit passed');
} catch (error) {
  console.log('⚠️  Security vulnerabilities found. Run "npm run security:fix" to address');
}

// Build the project
console.log('\n🏗️  Building project...');
try {
  execSync('npm run build', { stdio: 'inherit' });
  console.log('✅ Build successful');
} catch (error) {
  console.log('❌ Build failed. Please fix build errors before committing');
  process.exit(1);
}

// Check git status
console.log('\n📊 Git status:');
try {
  execSync('git status --porcelain', { stdio: 'inherit' });
} catch (error) {
  console.log('Error checking git status');
}

console.log('\n🎉 Pre-commit checks completed!');
console.log('\n📋 Next steps:');
console.log('1. Review your changes: git status');
console.log('2. Add files: git add .');
console.log('3. Commit: git commit -m "your commit message"');
console.log('4. Push: git push origin main');

console.log('\n📝 Commit message suggestions:');
console.log('- feat: add new feature name');
console.log('- fix: resolve issue with component');
console.log('- docs: update documentation');
console.log('- style: improve UI styling');
console.log('- refactor: restructure code');
console.log('- test: add test coverage');
console.log('- chore: update dependencies');

console.log('\n🌊 Ready to commit Blue Carbon MRV Dashboard!');
