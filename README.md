# Dynamic School Timetable Generator

This is a web-based application designed to help educational institutions create, manage, and print weekly school timetables with ease. It features a powerful, rule-based engine that automatically generates the schedule based on a highly customizable set of parameters.

## Key Features

-   **Rule-Based Generation**: Automatically generates a full week's schedule based on user-defined rules, including school hours, prayer times, and break schedules.
-   **Comprehensive Settings Panel**: A user-friendly interface to configure every aspect of the timetable:
    -   Prayer and school start times.
    -   Number of periods per day.
    -   Uniform or variable period durations.
    -   Multiple customizable breaks (e.g., lunch, short breaks).
-   **In-Place Editing**: Click "Edit" to instantly make changes to subjects directly within the timetable grid.
-   **Print-Friendly**: The layout is optimized for printing on standard landscape paper, with a clean and colorful design.
-   **Modern & Responsive UI**: Built with React and Tailwind CSS for a clean, responsive, and intuitive user experience.

## Architecture Overview

The application is built with a modern frontend stack, emphasizing separation of concerns between the UI and the core business logic.

-   **Frontend Framework**: **React** with **TypeScript** for robust, type-safe components.
-   **Build Tool**: **Vite** provides a fast and efficient development experience.
-   **Styling**: **Tailwind CSS** is used for all styling, with **shadcn/ui** providing a set of pre-built, accessible components.
-   **Core Logic**: The heart of the application is the schedule generation engine located in `src/lib/scheduleGenerator.ts`. This is a pure function that takes a `ScheduleSettings` object as input and returns a structured array of `ScheduleSlot` objects, which represent the daily schedule.
-   **State Management**: The application uses React's built-in `useState` hook to manage the settings and timetable data. The state is primarily held in the main `Timetable.tsx` component and passed down to child components.

### Component Structure

-   `src/pages/Index.tsx`: The main entry point that renders the `Timetable` component.
-   `src/components/Timetable.tsx`: The primary component responsible for displaying the timetable grid, handling user interactions like editing and printing, and managing the overall state.
-   `src/components/SettingsPanel.tsx`: A slide-out sheet component that allows users to modify the `ScheduleSettings` object. Changes made here are passed back up to the `Timetable` component, triggering a regeneration of the schedule.

## How to Customize

This application was designed to be easily customizable, both through the UI and in the code.

### UI Customization

Most common adjustments can be made directly through the **Settings** panel in the application. You can change timings, period counts, and break structures without touching any code.

### Code Customization

For more advanced changes, you can modify the following files:

1.  **Modify Generation Logic**:
    -   To change how the schedule is calculated (e.g., adding new types of events, handling complex break rules), edit the `generateSchedule` function in `src/lib/scheduleGenerator.ts`. Since this is a pure function, it's easy to test and modify without unintended side effects.

2.  **Change UI and Layout**:
    -   To alter the appearance of the timetable grid, modify the JSX and Tailwind CSS classes in `src/components/Timetable.tsx`.
    -   To add new settings or change the layout of the settings panel, edit `src/components/SettingsPanel.tsx`.

3.  **Adjust Styling**:
    -   Global styles and print media queries are located in `src/globals.css`.
    -   The color palette and theme variables are defined in `tailwind.config.ts`.

## Getting Started (Local Development)

To run this project on your local machine, follow these steps:

1.  **Prerequisites**:
    -   Node.js (v18 or later)
    -   npm, yarn, or pnpm

2.  **Clone the Repository**:
    ```bash
    git clone https://github.com/your-username/your-repo-name.git
    cd your-repo-name
    ```

3.  **Install Dependencies**:
    ```bash
    npm install
    ```

4.  **Run the Development Server**:
    ```bash
    npm run dev
    ```

    The application will be available at `http://localhost:8080`.