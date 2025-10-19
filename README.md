# Factorio Production Calculator

## A comprehensive web application for visualizing, optimizing, and saving Factorio factory production chains.

## Table of Contents
*   [Introduction](#introduction)
*   [Features](#features)
*   [Live Application](#live-application)
*   [Architecture](#architecture)
*   [Client-side Details](#client-side-details)
*   [Vue.js Implementation](#vuejs-implementation)
*   [Technologies](#technologies)
*   [Getting Started (Client)](#getting-started-client)

## Introduction
The Factorio Production Calculator is a web application designed to assist users in visualizing and optimizing their Factorio factory production chains. It allows users to input desired items, and the application handles all necessary calculations to display the production chain, including item, crafter, and belt demand.

While similar tools exist, this application aims to distinguish itself by implementing user profiles for persistent factory modeling over time and offering detailed calculations for processes like train throughput. The current release, "Visualizers and Beautification," focuses on providing a clear, table-based visualizer for calculated factory data and modernizing the site's overall aesthetic.

## Features
*   **Production Chain Visualization:** Clearly visualize complex production chains with detailed breakdowns of item demand, crafter requirements, and belt throughputs. The display supports searching and filtering of items within the calculated chain.
*   **User Input and Configuration:**
    *   **Demand Management:** Easily add and remove items from the production demand, and update quantities.
    *   **Crafter Configuration:** Select specific crafter types (e.g., assembly machine, furnace) for different categories of recipes to optimize production.
    *   **Belt Configuration:** Configure the type of belts used in the factory to accurately calculate throughput requirements.
    *   **Time Unit Recalculation:** Adjust the base time unit (seconds, minutes, hours) for all calculations.
    *   **Factory Controls:** Clear the entire factory configuration with a single action.
*   **User Accounts and Save Slots:**
    *   **User Profiles:** Create accounts to save and manage multiple factory configurations.
    *   **Save Slots:** Store up to three distinct factory layouts and settings in dedicated save slots, allowing users to track factory growth and modifications over time.
    *   **Secure Access:** User authentication for accessing and managing saved data.
*   **Responsive Navigation:** Both top and side navigation components are available to guide users through different sections of the application, adapting to screen sizes.

## Live Application
The live version of the application can be accessed at: [https://fpc-app.com](https://fpc-app.com)

## Architecture
This repository represents the client-side (frontend) of the Factorio Production Calculator, built as a Single Page Application (SPA). It interacts with a separate backend API to handle user authentication, account management, and persistence of user save slots. The client makes API calls using Axios to communicate with the server.

## Client-side Details
The client application, `@ceofyeast/fpc-client`, is primarily a Vue.js 3 project.
*   **`src/components/`**: Contains reusable Vue components that make up the user interface, such as `TheTopNav`, `TheSideNav`, `CalculatedDemandDisplay`, `UserInputMenu`, `SaveSlotMenu`, and various configuration menus (`CrafterConfigMenu`, `BeltConfigMenu`, etc.).
*   **`src/views/`**: Houses the main page components corresponding to different routes, like `ProductionCalculatorView`, `AccountAccessView`, `AccountCreationView`, `AboutView`, and `UserDataView`.
*   **`src/scripts/`**: Holds core JavaScript logic including routing (`router.js`), API service integrations (`axios.js`, `accountsAPI.js`, `saveSlotsAPI.js`), and global constants (`globals.module.js`).
*   **`src/stores/`**: Utilizes Pinia for centralized state management, with stores like `user.js` for user authentication and save slot data, and `loadedFactory.js` for factory calculation data.
*   **`src/assets/`**: Contains global styling (`Global.css`, `style.css`) and image resources.
*   **`public/`**: Stores static assets and the main `index.html` file.
*   **`vue.config.js`**: Vue CLI configuration, including Webpack plugins for polyfills.
*   **`.gitignore`**: Specifies files and directories to be ignored by Git, including `node_modules/`, `package-lock.json`, and sensitive server-side scripts or documentation.
*   **`launch.json`**: Visual Studio Code debugging configurations for launching Chrome or debugging the Vue.js app.

## Vue.js Implementation

The client application leverages the Vue.js 3 framework to build a dynamic and reactive Single Page Application (SPA). Key architectural patterns and features of Vue 3 are extensively used throughout the project:

*   **Components:** The entire user interface is broken down into a hierarchical structure of reusable Vue components, located primarily in `src/components/` and `src/views/`. These components encapsulate their own logic and templates, promoting modularity and maintainability.
*   **Composition API:** This API is utilized for organizing component logic, allowing for flexible and scalable code by extracting reactive stateful logic into reusable functions.
*   **Vue Router:** Manages client-side navigation, mapping URL paths to specific Vue components (`src/views/`) and enabling a seamless user experience without full page reloads.
*   **Pinia State Management:** Pinia, the official state management library for Vue, centralizes the application's global state. Stores (e.g., `user.js`, `loadedFactory.js` in `src/stores/`) manage user authentication, factory data, and other application-wide data, providing a predictable way to manage state across components.
*   **Reactivity:** Vue's reactive system ensures that changes to data automatically update the DOM, providing an efficient and straightforward way to build interactive UIs.

## Technologies
*   **Frontend Framework:** Vue.js 3
*   **State Management:** Pinia
*   **Routing:** Vue Router
*   **API Client:** Axios
*   **Build Tool:** Vue CLI (Webpack)
*   **Core Calculation Logic:** `@ceofyeast/prodchaincalculators` (a dedicated library for Factorio production chain calculations)
*   **Styling:** CSS with Vue's scoped styles and global utility classes.

## Getting Started (Client)
To set up and run the client-side application locally:

1.  **Prerequisites:** Ensure you have Node.js and npm (or Yarn) installed on your machine.
2.  **Clone the Repository:**
    ```bash
    git clone https://github.com/CEOFYEAST/FactorioProductionCalculator.git
    cd FactorioProductionCalculator
    ```
3.  **Navigate to Client Directory:**
    ```bash
    cd client
    ```
4.  **Install Dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```
5.  **Run Development Server:**
    ```bash
    npm run serve
    # or
    yarn serve
    ```
    The application will typically be available at `http://localhost:3001` as configured in `package.json` and `launch.json`.
6.  **Build for Production:**
    ```bash
    npm run build
    # or
    yarn build
    ```
    This will compile the application into static files in the `dist` directory.