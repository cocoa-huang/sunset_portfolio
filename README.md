# Sunset Portfolio

A personal website showcasing beautiful sunset locations from around the world with a clean, Notion-like aesthetic.

## Features

- Gallery of sunset locations
- Individual pages for each location with:
  - Photo galleries
  - Location details
  - Personal notes and tips
  - Map integration
- Clean, minimalist design inspired by Notion

## Tech Stack

- Next.js
- React
- TailwindCSS
- PostCSS

## Getting Started

1. Ensure you have Node.js installed (version 14.x or higher recommended)
2. Clone this repository
3. Install dependencies:

```bash
npm install
```

4. Run the development server:

```bash
npm run dev
```

5. Open your browser and navigate to `http://localhost:3000`

## Project Structure

- `/pages` - Next.js pages including index and dynamic location pages
- `/components` - Reusable React components
- `/styles` - Global CSS and TailwindCSS configuration
- `/public` - Static assets including images

## Adding New Locations

To add a new sunset location, add its data to the `locationData` object in `pages/location/[id].js` and add a corresponding entry to the `sunsetLocations` array in `pages/index.js`.

## Future Enhancements

- Add actual images for each location
- Implement a real map integration (Google Maps or Mapbox)
- Create a backend or CMS for easier content management
- Add image optimization with Next.js Image component
- Add a search/filter function for locations 