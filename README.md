# Factorio Production Calculator

## A web app designed to assist users in visualizing and optimizing their Factorio factory production chains.

## Table of Contents

*   [Project Overview](#project-overview)
*   [Features](#features)
*   [Technologies](#technologies)
*   [Vue.js Implementation Details](#vuejs-implementation-details)
*   [Project Structure](#project-structure)
*   [Getting Started](#getting-started)

---

## Project Overview

This is the client-side repository for the Factorio Production Calculator (FPC), a web application dedicated to helping users visualize and optimize their Factorio factory designs. While many similar tools exist, FPC distinguishes itself with planned features like user profiles, save slots, and intricate modeling of processes such as train throughput. The current release focuses on enhancing visualization and overall site aesthetics, transforming calculated factory data into insightful, table-based displays for item, crafter, and belt demands.

You can access the live application here: [https://fpc-app.com](https://fpc-app.com)

## Features

The Factorio Production Calculator offers a range of functionalities to enhance the factory planning experience:

*   **Production Chain Visualization:** Clearly displays the entire production chain, showing calculated demand for items, crafters, and belts required at each step.
*   **User Profiles and Save Slots:** Authenticated users can create accounts, sign in, and persist their factory configurations across multiple save slots, allowing them to track and evolve their designs over time.
*   **Configurable Factory Settings:** Users can adjust key parameters such as belt types, crafter selections, and the time unit for calculations (e.g., items per second, minute, or hour).
*   **Interactive Demand Management:** Easily add or remove items from the factory's production demand and clear the entire factory setup with simple controls.
*   **Search and Filtering:** Efficiently search through displayed production chains and filter results to focus on specific items.

## Technologies

The client-side application is built using a modern JavaScript ecosystem:

*   **Frontend Framework:** [Vue.js 3](https://vuejs.org/) for building reactive user interfaces.
*   **State Management:** [Pinia](https://pinia.vuejs.org/) for intuitive and type-safe state management across components.
*   **Routing:** [Vue Router 4](https://router.vuejs.org/) for declarative navigation within the single-page application.
*   **HTTP Client:** [Axios](https://axios-http.com/) for making API requests to the backend.
*   **Build Tool:** [Vue CLI Service](https://cli.vuejs.org/) for scaffolding, development server, and optimized production builds.
*   **Core Logic:** Integrates `@ceofyeast/prodchaincalculators` for complex Factorio production calculations.
*   **Styling:** Component-scoped CSS along with global stylesheets for a consistent look and feel.

## Vue.js Implementation Details

The application leverages Vue.js 3 as its primary frontend framework, orchestrating a reactive and component-driven user interface.

*   **Component-Based Architecture:** The UI is constructed from a hierarchy of Vue components. Reusable, smaller components reside in `src/components/`, encapsulating specific UI elements (e.g., navigation bars, tooltips). Larger, page-level components that define distinct views of the application are found in `src/views/` (e.g., the main calculator interface, account access pages). This modular approach enhances maintainability and code reusability.
*   **Declarative Routing with Vue Router:** Navigation within the single-page application is managed by Vue Router 4. The `src/scripts/router.js` module defines the application's routes, mapping URLs to specific Vue components from `src/views/`, enabling seamless transitions between different sections without full page reloads.
*   **Centralized State Management with Pinia:** Application-wide data and state are centrally managed using Pinia. Stores located in `src/stores/` (such as `user.js` for user authentication or `loadedFactory.js` for factory configuration) provide reactive data accessible across any component. This ensures consistent data flow and simplifies state synchronization, preventing prop-drilling in deep component trees.
*   **Reactive Data Flow:** Through Vue's reactivity system, changes in Pinia stores automatically trigger updates in relevant components, ensuring the UI always reflects the latest application state. This seamless data binding is fundamental to the interactive experience of the production calculator.

## Project Structure

The client application follows a standard Vue CLI project structure:

*   `public/`: Contains static assets like `index.html`, `favicon.ico`, and `style.css`.
*   `src/assets/`: Houses global CSS files and other static resources such as images.
*   `src/components/`: Reusable Vue components forming smaller UI elements (e.g., `TheTopNav.vue`, `ItemTooltip.vue`).
*   `src/scripts/`: JavaScript modules for routing (`router.js`), API interactions (`accountsAPI.js`, `saveSlotsAPI.js`), and other utilities.
*   `src/stores/`: Pinia stores (`user.js`, `loadedFactory.js`) to manage application-wide state.
*   `src/views/`: Top-level Vue components that serve as pages or routes within the application (e.g., `ProductionCalculatorView.vue`, `AccountAccessView.vue`).
*   `src/App.vue`: The root component of the Vue application.
*   `src/main.js`: The entry point for the Vue application, responsible for initialization and mounting.
*   `babel.config.js`: Babel configuration for JavaScript transpilation.
*   `jsconfig.json`: JavaScript language service configuration for enhanced tooling.
*   `vue.config.js`: Vue CLI configuration for customizing webpack settings.

## Getting Started

To get a local copy of the client application up and running, follow these steps.

### Installation

1.  Clone the repository to your local machine.
2.  Navigate into the client directory (where this `package.json` file resides).
3.  Install the necessary Node.js dependencies:
    ```bash
    npm install
    # or
    yarn install
    ```

### Running the Application

1.  To start the development server:
    ```bash
    npm run serve
    # or
    yarn serve
    ```
    The application will typically be available at `http://localhost:3001`.

2.  To build the application for production:
    ```bash
    npm run build
    # or
    yarn build
    ```
    This will compile and optimize the client-side assets into the `dist/` directory, ready for deployment.