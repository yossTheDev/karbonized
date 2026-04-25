# Changelog

## v 2.0.0

### 🚀 Features

- Migrate to Tailwind CSS v4 with new CSS-based configuration
- Migrate to Vite 8 for improved build performance
- Migrate to ESLint 9 with flat config system
- Add new window styles to CodeBlock: Pixel, Konsole, GTK, GNOME, RETRO and Paper
- Improve macOS window style with realistic traffic light buttons and proper spacing
- Improve Windows 11 window style with accurate title bar and window controls
- Enhance Paper window style with better textures, gradients, and paper tear effect
- Add automatic color setting for Paper theme (#fbfaf7) and disable window color picker
- Add rounded corners and shadows to various window styles for better realism
- Add blur effect for workspace backgrounds
- Add noise texture overlay for workspace backgrounds
- New Dynamic Background Effect

### 🐛 Fixes

- Fix 800+ ESLint errors (formatting, unused variables, and other linting issues)
- Fix TypeScript strict mode error in ProjectWizard.tsx (explicit comparison for any types)
- Fix Editor component not displaying by default (showWizard state initialization)
- Fix theme toggle not working by centralizing theme state in AppContext and updating CSS for class-based dark mode
- Fix code duplication in new window styles by using common SyntaxHighlighter
- Fix window color picker showing for Paper theme when it should be disabled
- Fix TypeScript and ESLint formatting issues across codebase
- Fix InfiniteViewer zoom being too aggressive when using Ctrl + mouse wheel scroll (added wheelScale and maxPinchWheel parameters)
- Fix ControlMenu Portal not rendering when RightPanel hasn't mounted yet (added useEffect to wait for #menu element)
- Fix ControlMenu disappearing when switching tabs in RightPanel (Portal container now persists within tab)
- Fix Moveable component appearing in exported images (added isExporting state to hide Moveable during export)
### 🔄 Changes

- Update TypeScript moduleResolution to "bundler" for better ESM support
- Remove old ESLint config files (.eslintrc.js, .eslintrc.json)
- Remove test message from App.tsx
- Refactor CodeBlock to use common SyntaxHighlighter for all styles to prevent duplication and enable proper stretching
- Update Tailwind CSS v4 gradient syntax (bg-linear-to-_ instead of bg-gradient-to-_)

### 📦 Dependencies

- Update vite: 5.1.5 → 8.0.0
- Update @vitejs/plugin-react: 4.2.1 → 6.0.0
- Update vite-plugin-electron: 0.28.4 → 0.29.0
- Update vite-plugin-pwa: 0.16.4 → 0.20.0
- Update eslint: 8.57.0 → 9.15.0
- Update eslint-plugin-react: 7.34.0 → 7.37.0
- Update @typescript-eslint/eslint-plugin: 6.1.0 → 8.15.0
- Add @typescript-eslint/parser: 8.15.0
- Update eslint-config-prettier: 8.5.0 → 9.1.0

### ⚙️ Configuration

- Add @tailwindcss/vite plugin to vite.config.ts
- Create eslint.config.js with flat config format
- Update tsconfig.json moduleResolution to "bundler"

## v 1.12.0 - Release (August 24th, 2023)

- feat: New Template System with Community-Generated Content
- New installation formats available for Linux
- All Previous Changes
- Minor Fixes and Improvements

## v 1.11.7

feat: Add a set of predefined gradients for background
fix: Change Background Color of Modals for better Consistency

## v 1.11.6

fix: Missing App Icon on Linux
fix: Lazy Load Templates

## v 1.11.5

- feat: News Panel with App Updates

## v 1.11.4

- fix: Wrong Data on Saving Projects
- fix: Missing Image on Blocks

## v 1.11.3

- feat: Background Images

## v1.11.2

- improve: Save as Template
- fix: Save Transform Properties of Blocks

## v 1.11.1

- feat: Save Project as Template
- improve: Add Device Thumbnails on PhoneBlock Device Selection Menu
- improve: Project Wizard (Added more project templates and implement a new template system)

## v 1.11.0

- feat: New Devices Mockups

## v 1.10.3

- Update App Icons on Desktop Platforms

## v 1.10.2

- feat: Add Download Image Option for Mobile Devices

## v 1.10.1 - Release (August 16th, 2023)

- fix: Show Menu Bar on Mac
- fix: Wrong Position of Drawing Panel

## v 1.10.0

- Android Version Available
- Minor Fixes and Improvements

## v 1.9.1

update: App Branding

## v 1.9.0

- Preparing Android Version
- feat: Save To Gallery (Android)
- feat: Share Image (Android)
- improve: Animation on Change Workspace Size or Colors
- fix: View Menu Disappear

## v 1.8.2

- Reduce App Loading Time
- Various Optimizations and Bug Fixes

## v 1.8.1

- fix: Change Theme Colors On Code Blocks

## v 1.8.0

- Change App The Colors
- Improve UI/UX

## v 1.7.2 - Release (August 6th, 2023)

feat: Auto Scroll Tabs
fix: Minor fixes and improvements

## v 1.7.1

improve: Tabs System
feat: Toggle Aspect Ratio Key Shortcut (Ctrl+R)
fix: Minor UI Fixes
fix: Open Multiples Menus at Time

## v 1.7.0

- New Stable Release
- Some Improvements and minor Bug Fixes

## v 1.6.2

- feat: Background Color for Custom Blocks
- improve: Loading extensions time
- improve: Extensions Progressive Loading
- fix: Can not Duplicate Custom Controls
- fix: Wrong Position of Control Editor on hidden items

## v 1.6.1

- Load Extensions Async

## v 1.6.0

fix: Wait for load plugins
feat: Add Plugin System (Beta)
feat: Logo Property for Extensions

## v 1.5.1

- fix: Some Bugs in Save and Load Projects
- fix: Prevent For Open Multiple Modals at Time

## v 1.5.0

- feat: Save and Load Projects

## v 1.4.3

- add: Donations Panel
- add: Changelog Panel
- fix: Minor UI fixes

## v 1.4.2

- add: Duplicate Option to Menu Bar
- improve: ColorPicker Behavior
- fix: Drawing Bar Wrong Position
- fix: Incorrect Size for Draw Canvas
- fix: Remove Exit Animation for Menus
- fix: You Need at least one Workspace
- fix: Color Picker Position on Drawing Panel
- fix: Snap System not work with multiples Workspaces

## v 1.4.1

- fix: Adding more tap area to Tab Items
- improve: Add loading state in Render Preview
- fix: Hide Controls
- fix: Auto Zoom in Workspace

## v 1.4.0

- New Workspaces System

## v 1.3.7

feat: Duplicate Controls (Shortcut Ctrl+D)
fix: Wrong Control Position in Status Bar

## v 1.3.6

- Improve UI for Web Version

## v 1.3.5

- Added Menu Bar
- Some improvements in Status Bar
- Minor Bug Fixes

## v 1.3.4

fix: Some Text Fields Overflow the Setting Panel
fix: Wrong Position of Drawing Panel

## v 1.3.3

- Change Editor Layout
- Layout Modes
- Various UI/UX Editor Improvements
- Double Click to Edit Control

## v 1.3.2

- fix: Bug in Automatic Centering

## v 1.3.1

- Move Background Settings to Menu Tab Bar

## v 1.3.0

- New Feature: Controls Hierarchy

## v 1.2.1

- Key Shortcut (Ctrl+N) to Create New Project
- Fix: New Elements get the same properties of the latest element before create new project
- Fix: Min Height and Width on Code Blocks

## v 1.2.0

- New Project Wizard
- Improve Redo/Undo System

## v 1.1.3

- Improve Redo Undo System
- Improve Performance
- Fix Github pages Deploy Workflow

## v 1.1.2

- Degree Angles To Snap Rotation
- Change Default Workspace Color
- Center View on Start and With KeyShortcut (Ctrl+Space)

## v 1.1.1

- Controls are now Snappables
- Update Project Dependencies
- Various Editor Improvements
- Some Improvements
- Minor Bug Fixes

## v 1.1.0 - Release (July 13th, 2023)

- Canvas Drawing System
- Transparent Background on Code blocks
- Some Improvements
- Minor Bug Fixes

## v 1.0.4

- Improve UI/UX
- Added Tooltips and Other Feedback controls for the users
- Improve Animations
- Now you can define and save custom gradients inside Color Picker
- Can set control size and position manually
- Add Key Shortcuts

## v 1.0.3 - Release (May 12th, 2023)

- New Design
- Change License to Apache-2.0
- Added Twitter and Badge Controls
- Now has Compiled Version for Desktop Platforms Powered by Tauri
- Added Option To Change App Theme Manually
- Improve Behavior of Editor
- Some Improvements
- Minor Bug Fixes

## v 1.0.2

- Added Light Theme
- Karbonized is now a PWA with offline support
- Added Window Control
- Replaced React-rnd for react-moveable
- Resizable Workspace
- More control over workspace
- Now you can define Workspace Name and Size
- Various improvements and Bug Fixed

## v 1.0.1

- Improve all controls
- Now you can manually define size and position of all controls
- Now you can change background color
- Now you can define colors of QR control
- Added context menu for delete component and take an individual screenshot
- Added Image Control
- Improve UI/UX
- Improve website for mobile devices

## v 1.0.0

First Version

Controls

- Text
- Qr
- Code
