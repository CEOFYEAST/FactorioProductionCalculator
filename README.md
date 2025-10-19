# Factorio Production Calculator

## A web app designed to assist users in visualizing and optimizing their Factorio factory production chains.

**Live Application:** [https://fpc-app.com](https://fpc-app.com)

---

### Table of Contents

*   [Overview](#overview)
*   [Features](#features)
*   [Technical Architecture](#technical-architecture)
*   [Development Setup](#development-setup)
*   [Usage](#usage)

---

### Overview

The Factorio Production Calculator is a web application created to aid users in designing their Factorio factories. It provides a visual interface for production chains, allowing users to easily add, remove, and manage products at any step. While similar tools exist, this application introduces user profiles for persistent factory modeling and advanced calculations, including train throughput.

This repository focuses on the client-side web application.

### Features

*   **Production Chain Visualization:** Offers a table-based visualizer for calculated factory data, including item, crafter, and belt demands.
*   **User-Configurable Settings:** Allows users to customize belt types, crafter types, and time units for calculations.
*   **User Profiles & Save Slots:** Supports user authentication and provides up to three save slots to store and retrieve factory designs across sessions.
*   **Interactive Input:** Provides menus for updating user demand, configuring crafters and belts, and miscellaneous controls like clearing the factory.
*   **Comprehensive Item Data:** Utilizes an external library to handle the complexities of Factorio recipes and production logic.

### Technical Architecture

This project is a client-side application built on a modern JavaScript stack, designed to interact with a separate backend server.

*   **Frontend:** Developed with **Vue.js 3**, using **Vue Router** for client-side navigation and **Pinia** for reactive state management. The user interface is styled using custom CSS variables and scoped component styles.
*   **Core Calculation Logic:** Integrates the `@ceofyeast/prodchaincalculators` library, an external package responsible for performing complex production chain calculations.
*   **Backend Interaction:** Communicates with a backend server (e.g., the `@ceofyeast/fpc-server` package) via **Axios** for functionalities such as user authentication, account creation, and managing save slots.
*   **Build System:** Leverages **Vue CLI** service for development and production builds, including Babel for JavaScript transpilation and Webpack with `node-polyfill-webpack-plugin`.

### Development Setup

To run this client-side application locally:

**Prerequisites:**
*   Node.js (v16.x or later is recommended).

**Client Installation:**
1.  Clone the repository:
    ```bash
    git clone https://github.com/CEOFYEAST/FactorioProductionCalculator.git
    ```
2.  Navigate to the client directory (assuming the client code is in a `client` subfolder):
    ```bash
    cd FactorioProductionCalculator/client
    ```
3.  Install project dependencies:
    ```bash
    npm install
    ```

**Running the Client:**
*   To start the development server:
    ```bash
    npm run serve
    ```
*   The application will typically be available at `http://localhost:3001`.
*   **Note:** For full functionality, including user profiles and save slots, a compatible backend server must be running.

### Usage

The web application provides an intuitive interface for Factorio factory design:

1.  **Input Demand:** Begin by adding desired items to your production demand using the "User Input" menu.
2.  **Visualize Chains:** The "Production Chain Visualizer" will display the calculated production chain, showing the necessary items, crafters, and belts.
3.  **Configure Settings:** Adjust global settings such as belt types, crafter configurations, and the time unit for calculations through the dedicated menus.
4.  **Manage Accounts:** Sign in or create an account to access "Save Slots," allowing you to save and load different factory designs.
5.  **Explore Data:** Interact with the visualizer to understand the intricate dependencies and requirements of your factory.