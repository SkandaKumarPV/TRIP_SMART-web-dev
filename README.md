# TripSmart
 
Nearby Places with Routes, Search, Weather, Dark Mode, Multi-Destination, and Favorites

Overview
This project provides an interactive map that allows users to explore nearby places, get route directions, and access various features such as weather updates and favorites. The app includes a Dark Mode toggle and a Save for Later (Favorites) feature, making the user experience more flexible and personalized.

Booster points Implemented in the solution
1. Dark Mode Toggle
Core Implementation: Users can easily toggle between Light and Dark mode for a more comfortable viewing experience, especially in low-light environments. The dark mode theme adjusts the UI colors and layout to provide a sleek, eye-friendly interface.
Implementation: A button on the top-right corner of the screen enables the toggle between light and dark themes. The app dynamically updates the appearance without requiring a page reload.

3. Save for Later (Favorites)
Frontend Implementation: The Save for Later feature allows users to save their favorite places for future reference. Users can mark places as favorites, which are stored locally in the browser and are displayed with a special favorite icon on the map.
Core Implementation: Each saved favorite is stored in localStorage. When a user clicks on a place, they can add it to their favorites, and the application updates the display accordingly. If a user revisits the app, their saved places are still accessible.

Technologies Used
Frontend: HTML, CSS, JavaScript, Leaflet.js for interactive maps, and Leaflet Routing Machine for route calculations.
LocalStorage: Used to persist the favorite places across sessions.
CSS Transitions: Smooth theme switching between light and dark modes.

How to Use
Dark Mode: Click the "🌙 Dark Mode" button to toggle between Light and Dark themes.
Save Places: When clicking on a place on the map, users can add it to their Favorites by clicking the heart icon. Saved places will be marked and accessible later.
Future Enhancements
More interactive features, including real-time weather updates for selected places.
Additional user preferences for further customizing the map and routes.
Expanded favorite places with detailed descriptions and images.

