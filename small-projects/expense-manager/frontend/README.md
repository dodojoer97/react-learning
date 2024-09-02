# Expense Manager

## Overview

The Expense Manager is a dynamic web application designed for tracking and managing daily expenses. Developed using React, Tailwind CSS, and TypeScript, it features a responsive design, modular component architecture, and intuitive user interfaces. This application simplifies personal finance management through structured navigation and efficient data handling.

## Application Structure

This section outlines the application's routing and page layout, providing details on how components are organized across different routes.

### Routes

1. **Home Page (`/`)**

    - **Components**: Header
    - **Description**: Presents a welcoming title and brief description of the application, serving as an entry point to other features.

2. **Dashboard (`/dashboard`)**

    - **Components**: Header, 5 last records(expenses or incomes), pie chart of last period(month, week, year), time period seletor(last 30D, last week, last year), a button to add transactions
    - **Description**: Provides visual analytics of financial data, enabling users to gain insights through charts and graphs based on selected date ranges.

3. **Records (`/records`)**

    - **Components**: Header, List of all records, filtered by type(dropdown or tabs), autocomplete to find a speciic transaction
    - **Description**: Provides visual analytics of financial data, enabling users to gain insights through charts and graphs based on selected date ranges.

4. **Login Page (`/login`)**

    - **Components**: Header, Login Component
    - **Description**: Facilitates user authentication with a form for entering credentials. This page provides access to registered users to manage their expenses.

5. **Signup Page (`/signup`)**

    - **Components**: Header, Signup Component
    - **Description**: Allows new users to create an account, enabling them to use the application's features to manage personal finances.

6. **Settings Page (`/settings`)**
    - **Components**: Header, Settings Component
    - **Description**: Enables users to customize application settings such as currency or theme preferences. Provides tools to manage account details and configuration.

## Key Components

### 1. Header Component

-   **Purpose**: Provides navigation links and quick access to major sections of the application.
-   **Features**: Responsive design with links to the Home, Expenses, Analytics, Login, Signup, and Settings pages.

### 2. Expense Form Component

-   **Purpose**: Facilitates the addition and editing of expenses.
-   **Features**: A form equipped with fields for expense name, amount, category, and date, along with validation and submission functionalities.

### 3. Expense List Component

-   **Purpose**: Displays all recorded expenses.
-   **Features**: Shows detailed entries including name, amount, category, date, with options to edit or delete.

### 4. Category Filter Component

-   **Purpose**: Enables expenses to be filtered based on categories.
-   **Features**: Utilizes a dropdown or button group for category selection.

### 6. Summary Component

-   **Purpose**: Provides a brief overview of expenses.
-   **Features**: Displays total expenses, categorized expenses, and comparative analyses over different periods.

### 7. Dashboard Component

-   **Purpose**: Acts as the central hub for viewing various financial summaries.
-   **Features**: Incorporates Summary and Chart Components for a holistic financial overview.

### 8. Alert Component

-   **Purpose**: Communicates alerts or messages (successes or errors).
-   **Features**: Customizable to display various message types based on user actions.

### 9. Authentication Components

-   **Purpose**: Handles user authentication.
-   **Features**: Includes components for login, registration, and password recovery.

### 10. Loading Component

-   **Purpose**: Indicates ongoing data operations.
-   **Features**: Displays a generic loading spinner or animation.

### 11. Chart Components (Pie Chart, Bar Graph)

-   **Purpose**: Graphically represents financial data.
-   **Features**: Employs libraries like Chart.js to visualize data effectively.

### 12. Settings Component

-   **Purpose**: Manages user-specific settings such as currency or theme preferences.
-   **Features**: Offers form inputs for configuring and retrieving settings from local storage or a backend.
