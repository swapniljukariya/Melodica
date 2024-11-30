import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LayoutWithoutSidebar from './components/LayoutWithoutSidebar'; // Layout with header and footer
import HomePage from './components/Home'; // HomePage component
import PlaylistPage from './components/PlaylistPage'; // All playlists page
import PlaylistDetailsPage from './components/PlaylistDetail'; // Individual playlist details
import LikedSongsPage from './components/LikedSongs'; // Liked songs page
import AboutPage from './components/About'; // About Us page
import PremiumPage from './components/Premium'; // Premium subscription page
import ArtistList from './components/Artist'; // List of artists
import ArtistTracks from './components/ArtistTracks'; // Artist details page (new page)
import ErrorPage from './components/ErrorPage'; // Error handling page
import { AppProvider } from './Context/Globalstate'; // Global state provider
import { ToastContainer } from 'react-toastify'; // Toast notifications
import 'react-toastify/dist/ReactToastify.css'; // Toast CSS

// Define the routes for the application
const router = createBrowserRouter([
  {
    path: '/',
    element: <LayoutWithoutSidebar />, // Main layout (with header and footer)
    errorElement: <ErrorPage />, // Fallback UI for errors
    children: [
      { path: '/', element: <HomePage /> }, // Home page
      { path: 'playlist', element: <PlaylistPage /> }, // List of all playlists
      { path: 'playlist/:playlistName', element: <PlaylistDetailsPage /> }, // Playlist details by name
      { path: 'liked-songs', element: <LikedSongsPage /> }, // Liked songs
      { path: 'about', element: <AboutPage /> }, // About us page
      { path: 'premium', element: <PremiumPage /> }, // Premium features
      { path: 'artists', element: <ArtistList /> }, // List of artists
      { path: 'artist/:id', element: <ArtistTracks /> }, // Artist details (new route for individual artist's tracks)
    ],
  },
]);

const App = () => {
  return (
    <AppProvider>
      {/* Provide Router for navigation */}
      <RouterProvider router={router} />

      {/* Toast container for notifications */}
      <ToastContainer
        position="top-right"
        autoClose={3000} // Auto-close after 3 seconds
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark" // Options: 'light', 'dark', 'colored'
      />
    </AppProvider>
  );
};

export default App;
