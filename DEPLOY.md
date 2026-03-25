# PetPill v1.2.0 — Android Deployment Guide

## Pre-requisites

1. **Google Play Console account** ($25 one-time registration fee)
   - Sign up at https://play.google.com/console

2. **EAS CLI installed**
   ```bash
   npm install -g eas-cli
   eas login
   ```

3. **Google Play Service Account JSON key**
   - In Google Play Console → Setup → API Access → Create service account
   - Download the JSON key file
   - Save as `google-services.json` in the project root
   - This file is gitignored for security

## Build & Deploy Steps

### Step 1: Install dependencies
```bash
npm install
```

### Step 2: Build a preview APK (for testing)
```bash
npm run build:preview
```
This creates an APK you can sideload on any Android device for testing.

### Step 3: Build production AAB (for Play Store)
```bash
npm run build:production
```
This creates an Android App Bundle (.aab) required by Google Play Store.

### Step 4: Submit to Google Play Store
```bash
npm run submit
```
This uploads the AAB to your Google Play Console as an internal draft.

### Step 5: Complete Play Store listing
In Google Play Console, fill in:
- **App name**: PetPill
- **Short description**: Track your pet's medications, health & vet visits
- **Full description**: (Use the description from app.json)
- **Screenshots**: At least 2 phone screenshots
- **Feature graphic**: 1024x500 banner image
- **Privacy policy URL**: https://petpill.app/privacy (host your privacy policy)
- **App category**: Medical
- **Content rating**: Complete the questionnaire
- **Target audience**: General (not primarily for children)

### Step 6: Release
- Start with Internal Testing track first
- Then Closed Testing → Open Testing → Production

## Privacy Policy

A complete privacy policy is built into the app at Settings → Privacy Policy.
You need to host it at a public URL for the Play Store listing.
Options:
- GitHub Pages (free)
- Your own domain
- Google Sites (free)

## App Signing

EAS handles app signing automatically. On first production build, EAS generates
and manages your upload key. Google Play manages the app signing key.

## Version Management

- `app.json` → `version`: User-visible version (e.g., "1.2.0")
- `app.json` → `android.versionCode`: Must increment with each upload (auto-incremented by EAS)
- `eas.json` → `autoIncrement: true`: Handles versionCode bumps automatically
