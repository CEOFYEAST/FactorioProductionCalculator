# Factorio Production Calculator

## A web app designed to assist users in visualizing and optimizing their Factorio factory production chains.

---

## Table of Contents

*   [About the Project](#about-the-project)
*   [Live Application](#live-application)
*   [Key Features](#key-features)
*   [Technology Stack](#technology-stack)
*   [Project Structure](#project-structure)
*   [Usage](#usage)

---

## About the Project

The Factorio Production Calculator (FPC) is a web application centered around visualizing and optimizing complex production chains in the game Factorio. Users can input desired items, and the app will perform all necessary calculations to determine resource demand, crafter requirements, and transportation needs (belts).

Beyond basic calculations, FPC aims to differentiate itself by offering robust features such as user profiles for persistent factory modeling and advanced calculations for factors like train throughput.

The current release, known as "Visualization and Beautification," significantly enhances the user interface with a table-based visualizer for detailed factory data (item, crafter, and belt demand) and an overall modernized visual design.

## Live Application

Access the live version of the application here: [https://fpc-app.com](https://fpc-app.com)

## Key Features

*   **Interactive Production Chain Visualizer:** Clearly displays entire production chains, showing item flow, demand, and resource requirements.
*   **Comprehensive Demand Calculation:** Automatically computes the quantities of items, crafters, and belts needed to meet user-defined production goals.
*   **Configurable Factory Settings:**
    *   **Crafter Management:** Select optimal crafter types for various production categories to fine-tune efficiency.
    *   **Belt System Customization:** Choose from different belt types to match throughput requirements and factory scale.
    *   **Dynamic Time Unit Adjustment:** Toggle calculations and display rates between items per second, minute, or hour.
*   **User Account & Save Slots:** Create user profiles to securely store and manage up to three distinct factory configurations across sessions.
*   **Flexible Item Input:** Easily add, remove, and update item demands within the production chain.
*   **Search and Filter:** Quickly find specific items within large production chains using an integrated search function.
*   **Informative Item Tooltips:** Hover over item icons to view detailed names and information.
*   **Factory Clearing:** Reset all production demands and configurations with a single action.

## Technology Stack

The client-side of the Factorio Production Calculator is built with modern web technologies:

*   **Frontend Framework:** Vue.js 3
*   **State Management:** Pinia
*   **Routing:** Vue Router
*   **HTTP Client:** Axios
*   **Build Tool:** Vue CLI
*   **Core Logic:** Leverages the `@ceofyeast/prodchaincalculators` library for Factorio-specific calculations.
*   **Styling:** Custom CSS with a variable-based design system.

The application interacts with a separate backend service (`@ceofyeast/fpc-server`) for user authentication and managing saved factory data.

## Project Structure

The client application's source code is organized as follows:

*   `/src/assets/`: Contains global styling definitions (`Global.css`).
*   `/src/components/`: Houses reusable Vue components such as navigation bars, menus, and display elements.
*   `/src/scripts/`: Stores utility JavaScript files, API interaction modules, and the Vue Router configuration.
*   `/src/stores/`: Contains Pinia stores for managing application state, including user data and factory configurations.
*   `/src/views/`: Defines the top-level Vue components for different application pages (e.g., About, Account Access, Production Calculator).
*   `main.js`: The entry point for the Vue application.
*   `public/`: Contains static assets like `index.html` and `favicon.ico`.

## Usage

To run the Factorio Production Calculator client application locally:

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) and a package manager like npm or yarn installed on your system.

### Installation

1.  Clone this repository to your local machine.
2.  Navigate to the client application directory (e.g., `cd client` if it's in a subdirectory).
3.  Install the project dependencies:
    ```bash
    npm install
    # or
    yarn install
    ```

### Running the Application

Start the development server:

```bash
npm run serve
# or
yarn serve
```

The application will typically be available at `http://localhost:3001` in your web browser.

### Debugging (VS Code)

For an enhanced debugging experience with VS Code:

1.  Open the project folder in VS Code.
2.  Utilize the provided `launch.json` configurations. You can select either "Launch Chrome against localhost" to debug the client in your browser, or "Debug Vue.js App" to debug the Vue CLI service directly.