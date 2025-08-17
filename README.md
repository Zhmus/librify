# Librify

**Librify** is a lightweight library CRM built with React and TypeScript. It allows managing books, readers, and loans, while providing useful statistics about library activity.

## Technologies

- **React 19**
- **TypeScript**
- **Webpack**
- **React Router**
- **React Hook Form**
- **React Redux / Redux Toolkit**
- **Chart.js + react-chartjs-2**
- **Immer**
- **Yup**
- **Jest + React Testing Library**
- **Sass**

## Project Structure

```bash
src/
├── app/             # App entry point and store setup
├── composites/      # Feature sections (books, readers, loans, stats)
├── entities/        # Domain entities (books, readers, loans)
├── features/        # Functional features (modals, forms, controllers)
├── layouts/         # App layouts (MainLayout, EmptyLayout)
├── pages/           # Pages
├── shared/          # Shared UI components, hooks, utils
└── styles/          # Global and component styles
public/
├── data/            # Mock JSON data
└── index.html
```

## Features

- Books and readers management (CRUD)
- Loan issuance and return
- Statistics dashboards:
    - Loans by month (line chart)
    - On-time vs overdue loans (pie chart)
    - Top books and readers (bar charts)
    - Popular genres (pie chart)
    - Average loan duration
- Modular architecture with reusable hooks and components

## Installation and Running

```bash
# Install dependencies
npm install

# Run development server
npm start

# Build production version
npm run build

# Run tests
npm test

```
Notes

Project is a personal pet project aimed at practicing React, TypeScript, modular architecture, and data visualization.

Focus is on clean code, component reusability, and simple but informative dashboards.
