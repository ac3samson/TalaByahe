# TalaByahe

**Offline-first mobile ticketing system** — frontend demo for provincial bus operations.

This repo contains two apps (mock data only, no backend):

| App | Folder | Run command |
|-----|--------|-------------|
| **Conductor (mobile)** | `conductor/` | `npm start` → APK via EAS |
| **Admin (web)** | `admin/` | `npm run dev` |

## Prerequisites

Install on your PC:

1. [Node.js LTS](https://nodejs.org/) (v18+)
2. [Git](https://git-scm.com/) (optional)
3. Free [Expo account](https://expo.dev) (for APK build)

## Quick start — Admin web

```bash
cd admin
npm install
npm run dev
```

Open the URL shown (usually `http://localhost:5173`). Sign in with any credentials.

**Screens:** Dashboard, Employees, Routes, Fares, Monitoring, Reports

## Quick start — Conductor mobile

```bash
cd conductor
npm install
npx expo install
```

### Option A: Preview on phone (fastest, no APK)

1. Install **Expo Go** from Play Store
2. Run `npm start`
3. Scan the QR code with Expo Go

### Option B: Build APK (for screenshots)

```bash
cd conductor
npm install -g eas-cli
eas login
eas init
npm run build:apk
```

When the cloud build finishes, download the `.apk` and install it on your Android phone.

> **First-time setup:** If `assets/` icons are missing, run:
> `npx create-expo-app@latest temp-app --template blank` then copy the `assets` folder from `temp-app` into `conductor/`.

## Demo flow (conductor app)

1. **Sign in** with any employee ID
2. **Start Trip** — pick route + bus
3. **Issue Ticket** — select origin/destination, fare auto-computes
4. **Digital Receipt** — screenshot this screen
5. **Passengers** — view issued tickets
6. **Trip Summary** — earnings total, end trip

Data is saved locally on the device (AsyncStorage) to simulate offline-first behavior.

## Project structure

```
TalaByahe/
├── shared/mockData.js    # Routes, fares, employees (shared)
├── admin/                # Web dashboard for CLIENT admin
└── conductor/            # Mobile app for bus conductors
```

## Capstone alignment

| Objective | Implemented in |
|-----------|----------------|
| Admin: employee onboarding, routes, fares, monitoring, reports | `admin/` |
| Conductor: passenger monitoring, auto fare, digital tickets, earnings | `conductor/` |

---

*Frontend prototype — ready for backend integration later.*
