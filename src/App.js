import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LayoutWithoutSidebar from './components/LayoutWithoutSidebar'; // Layout with header and footer
import HomePage from './components/Home'; // Your HomePage component
import PlaylistPage from './components/PlaylistPage';
import PlaylistDetailsPage from './components/PlaylistDetail'; // New component for playlist details
import LikedSongsPage from './components/LikedSongs';
import AboutPage from './components/About'; // About Us page
import SignInPage from './components/Signin'; // Sign In page
import PremiumPage from './components/Premium'; // Premium page
import ArtistList from './components/Artist'; // Artist list component
import ArtistTracksPage from './components/ArtistTracks'; // Artist tracks page component
import ErrorPage from './components/ErrorPage';
import { AppProvider } from './Context/Globalstate'; // Global state provider

const App = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <LayoutWithoutSidebar />, // Layout with header and footer
      errorElement: <ErrorPage />, // Fallback in case of errors
      children: [
        { path: '/', element: <HomePage /> },
        { path: 'playlist', element: <PlaylistPage /> },
        { path: 'playlist/:playlistName', element: <PlaylistDetailsPage /> },
        { path: 'liked-songs', element: <LikedSongsPage /> },
        { path: 'about', element: <AboutPage /> },
        { path: 'signin', element: <SignInPage /> },
        { path: 'premium', element: <PremiumPage /> },
        { path: 'artists', element: <ArtistList /> },
        { path: 'artist/:artistId', element: <ArtistTracksPage /> }, // Dynamic route
      ],
    },
  ]);

  return (
    <AppProvider>
      <RouterProvider router={router} />
    </AppProvider>
  );
};

export default App;
