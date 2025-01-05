# Project: Property Listing Application

This is a React-based project that provides a searchable property listing. It allows users to:

- Filter properties by type, price range, bedroom count, dates, and postcode.
- View property details, including images and additional information.
- Mark properties as favourites, which are persisted using local storage.

## Features

- A sidebar for entering search criteria (property type, price range, bedrooms, dates, postcode).
- A listing of properties (fetched from public/properties.json) that updates in real-time based on criteria.
- A draggable interface to add properties to favourites.
- A dedicated favourites page for saving and managing favourite properties.
- A property details page that displays multiple images and essential info.
- Responsive layout and basic styling with CSS files.

## Prerequisites

- Node.js (v14+ recommended)
- npm or yarn

## Installation

1. Clone this repository.
2. Navigate to the project folder.
3. Run:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm start
   ```

## Project Structure

- **public/**
  - index.html (entry point)
  - properties.json (data source)
- **src/**
  - index.js (rendering root)
  - App.js (main application component)
  - components/ (various React components)
  - styles/ (CSS files)

## Scripts

- **npm start**  
  Starts the development server.
- **npm run build**  
  Creates a production-ready build.
- **npm test**  
  Runs tests.

## Usage

1. Start the development server:
   ```bash
   npm start
   ```
2. Open your browser at http://localhost:3000.
3. Click the search button in the navbar to open the sidebar and enter filter criteria.
4. Drag property cards into the sidebar to add them to favourites.
5. Access favourites under “Favorites”.

## License

This project is provided as-is with no explicit license. Use at your own discretion.
