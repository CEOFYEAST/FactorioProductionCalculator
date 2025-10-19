# Factorio Production Calculator

## A web app designed to assist users in visualizing and optimizing their Factorio factory production chains.

---

### Table of Contents
*   [About](#about)
*   [Live Application](#live-application)
*   [Features](#features)
*   [Technology Stack](#technology-stack)
*   [Getting Started](#getting-started)
    *   [Installation](#installation)
    *   [Running the Application](#running-the-application)
    *   [Debugging](#debugging)

---

### About
This web application provides a comprehensive tool for Factorio players to visualize and optimize their factory production chains. While similar tools exist, this project distinguishes itself by planning to implement user profiles for persistent factory modeling over time and incorporating detailed modeling of processes like train throughput.

The current release, "Visualizers and Beautification," focuses on presenting calculated factory data—including item, crafter, and belt demands—in an intuitive table format. Significant effort has been put into modernizing the site's overall aesthetic and user interface.

### Live Application
Experience the application directly: [https://fpc-app.com](https://fpc-app.com)

### Features
*   **Interactive Production Chain Visualization**: Displays detailed production chains, including item requirements, crafters, and belt throughput, with expandable sub-rows for deeper analysis.
*   **User Demand Management**: Easily add, remove, and update the desired output items for your factory.
*   **Configuration Options**: Customize belt types and crafter types to accurately reflect your in-game factory setup.
*   **Time Unit Recalculation**: Adjust calculations to display demand per second, minute, or hour.
*   **Factory Management**: Clear all current factory data with a single action.
*   **User Profiles and Save Slots**: Create an account to save up to three different factory configurations, allowing you to track and manage your designs across sessions.
*   **Responsive Navigation**: Utilizes both top and side navigation components for intuitive access to different application sections, adapting to various screen sizes.
*   **Item Tooltips**: Provides helpful tooltips displaying item names upon hover for clarity.

### Technology Stack
The client-side application is built primarily with:
*   **Vue.js 3**: Progressive JavaScript framework for building user interfaces.
    *   **Usage**: Vue.js is central to constructing the interactive user interface, managing reactive components that display complex production data, and orchestrating user inputs for factory configuration. It enables the dynamic and responsive presentation of calculations and factory visualizations.
*   **Pinia**: A lightweight and intuitive state management library for Vue.js.
*   **Vue Router**: Official routing library for Vue.js to manage application navigation.
*   **Axios**: Promise-based HTTP client for making API requests to the backend server.
*   **Vue CLI**: Standard tooling for rapid Vue.js development.
*   **Babel**: JavaScript compiler for transpiling modern JavaScript into compatible versions.
*   **Webpack**: Module bundler used by Vue CLI to manage assets and code.
*   **Factorio Production Calculators (NPM Package)**: A custom library (`@ceofyeast/prodchaincalculators`) that provides core calculation logic, including IRPTU (Items Required Per Time Unit) and production chain traversal algorithms.
*   **Bootstrap**: For enhanced styling and responsive design.

### Getting Started
These instructions will help you set up and run the client-side application locally for development and testing.

#### Installation
1.  **Clone the repository.**
2.  **Navigate to the client directory.**
3.  **Install dependencies**:
    ```bash
    npm install
    ```

#### Running the Application
To start the development server:
```bash
npm run serve
```
The application will typically be served at `http://localhost:3001`.

#### Debugging
For debugging with VS Code, the repository includes `launch.json` configurations:
*   **Launch Chrome against localhost**: Debug the frontend in Chrome at `http://localhost:3001`.
*   **Debug Vue.js App**: Debug the Vue CLI service itself.

The application interacts with a backend server, which is expected to be running separately (e.g., a `@ceofyeast/fpc-server` instance). The API base URL is configured in `globals.module.js`.