# Factorio Production Calculator

## A web app designed to assist users in visualizing and optimizing their Factorio factory production chains.

## Table of Contents
* [Live Application](#live-application)
* [About the Project](#about-the-project)
* [Features](#features)
* [Technologies Used](#technologies-used)
* [Vue.js Architecture](#vuejs-architecture)
* [Project Structure](#project-structure)
* [Getting Started](#getting-started)
* [Debugging](#debugging)

## Live Application
Access the live version of the Factorio Production Calculator here: [https://fpc-app.com](https://fpc-app.com)

## About the Project
This application provides a comprehensive tool for Factorio players to visualize and optimize their factory production chains. Users can input desired items, and the app will automatically calculate and display the full production chain, including raw material demands, intermediate products, and required crafters and belts. While similar tools exist, this project aims to differentiate itself by offering features such as user profiles for persistent factory modeling over time and advanced calculations, including train throughput, which are not commonly found in other calculators.

## Features
*   **Interactive Production Chain Visualization:** Displays a detailed, table-based view of all items, crafters, and belts required for a given production goal.
*   **User Demand Management:** Easily add or remove items from your factory's production demand.
*   **Configurable Crafters and Belts:** Adjust settings for different tiers of crafters and belts to accurately model your factory's infrastructure.
*   **Time Unit Recalculation:** Convert production rates between seconds, minutes, and hours.
*   **User Authentication & Save Slots:** Create an account to save and load multiple factory configurations, allowing users to track their factory's evolution.
*   **Item Tooltips:** Hover over item icons to see their full names.
*   **Search Functionality:** Filter items within the production chain display.

## Technologies Used
This project is primarily a client-side web application built with a focus on a responsive and interactive user interface.

*   **Frontend Framework:** Vue 3
*   **State Management:** Pinia
*   **Routing:** Vue Router
*   **HTTP Client:** Axios for API communication.
*   **Core Logic:** Leverages the `@ceofyeast/prodchaincalculators` library for all Factorio-specific production chain calculations.
*   **Build Tooling:** Vue CLI for development and production builds, including Webpack configuration enhancements like `node-polyfill-webpack-plugin`.
*   **Styling:** Custom CSS with a focus on modularity and reusability, utilizing CSS variables for consistent theming.
*   **Backend Interaction:** Communicates with a separate server (implied by the `fpc-server` dependency in the root project) for user authentication and managing save slots.

## Vue.js Architecture
Vue.js 3 serves as the foundational frontend framework for this application, enabling the creation of a dynamic and responsive user experience. Its progressive nature allows for flexible integration and scaling.

*   **Component-Based Design:** The application's user interface is constructed using reusable Vue components, each encapsulating its own logic, template, and styles. This modular approach enhances maintainability and allows for consistent UI elements across the application, from navigation bars (`TheTopNav.vue`) to complex data displays (`CalculatedDemandDisplay.vue`).
*   **Reactivity System:** Vue's core reactivity system is extensively utilized to ensure that the UI automatically updates in real-time as the underlying data changes. This is crucial for an interactive calculator where user inputs (e.g., changing demand) instantly reflect in the displayed production chains.
*   **Single-File Components (SFCs):** All components are structured as `.vue` files, which elegantly combine HTML templates, JavaScript logic, and scoped CSS styles into a single, cohesive unit. This approach streamlines development and improves code organization.
*   **Client-Side Routing with Vue Router:** `vue-router` manages the application's navigation, enabling smooth transitions between different views (e.g., `ProductionCalculatorView.vue`, `AccountAccessView.vue`) without requiring full page reloads. This provides a fast and native-app-like user experience.
*   **State Management with Pinia:** Pinia, the official state management library for Vue, is employed to centralize and manage global application state. Dedicated stores (e.g., `user.js` for authentication details, `loadedFactory.js` for active factory configurations) ensure that data is consistently available and mutable across various components.

## Project Structure
The client-side repository is organized to separate concerns and facilitate development:

*   `.gitignore`: Specifies files and directories to be excluded from version control, including `node_modules/` and sensitive information like `documentation/ssl-certs`.
*   `public/`: Contains `index.html` and static assets like `favicon.ico` and global `style.css`.
*   `src/`: The main application source directory.
    *   `assets/`: Global CSS (`Global.css`) and other static assets.
    *   `components/`: Reusable Vue components such as `TheTopNav.vue`, `TheSideNav.vue`, `CalculatedDemandDisplay.vue`, `UserInputMenu.vue`, and various configuration menus.
    *   `scripts/`: JavaScript utilities, API integrations (`accountsAPI.js`, `saveSlotsAPI.js`, `axios.js`), and router definition (`router.js`).
    *   `stores/`: Pinia stores (`user.js`, `loadedFactory.js`) for centralized state management.
    *   `views/`: Top-level Vue components representing different pages of the application (`ProductionCalculatorView.vue`, `AccountAccessView.vue`, `AboutView.vue`, `UserDataView.vue`, `AccountCreationView.vue`).
    *   `App.vue`: The root Vue component of the application.
    *   `main.js`: The entry point for the Vue application.
*   `babel.config.js`, `jsconfig.json`, `vue.config.js`: Configuration files for Babel, JavaScript language services, and Vue CLI respectively.
*   `launch.json`: VS Code debugger configurations.

## Getting Started

To get a local copy of the project up and running, follow these steps.

### Installation
Navigate to the client directory and install the necessary dependencies:
```bash
npm install
```

### Running in Development
To start the development server, which includes hot-reloading:
```bash
npm run serve
```
The application will be accessible at `http://localhost:3001`.

### Building for Production
To build the application for production, optimizing assets and code:
```bash
npm run build
```
This will generate production-ready files in the `dist/` directory.

## Debugging
The repository includes Visual Studio Code launch configurations in `.vscode/launch.json` to facilitate debugging:

*   **Launch Chrome against localhost:** Configured to debug the client application directly in Chrome, connected to `http://localhost:3001`.
*   **Debug Vue.js App:** Launches the Vue CLI service to run the application in development mode, enabling Node.js debugging for the client-side code.