import React, { Suspense, lazy } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LayoutWithoutSidebar from './components/LayoutWithoutSidebar';
import ErrorPage from './components/ErrorPage';
import { AppProvider } from './Context/Globalstate';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoadingSpinner from './LoadingSpinner';


// Lazy-loaded components
const HomePage = lazy(() => import('./components/Home'));
const PlaylistPage = lazy(() => import('./components/PlaylistPage'));
const PlaylistDetailsPage = lazy(() => import('./components/PlaylistDetail'));
const LikedSongsPage = lazy(() => import('./components/LikedSongs'));
const AboutPage = lazy(() => import('./components/About'));
const PremiumPage = lazy(() => import('./components/Premium'));
const ArtistList = lazy(() => import('./components/Artist'));
const ArtistTracks = lazy(() => import('./components/ArtistTracks'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <LayoutWithoutSidebar />,
    errorElement: <ErrorPage />,
    children: [
      { path: '/', element: <Suspense fallback={<LoadingSpinner />}><HomePage /></Suspense> },
      { path: 'playlist', element: <Suspense fallback={<LoadingSpinner />}><PlaylistPage /></Suspense> },
      { path: 'playlist/:playlistName', element: <Suspense fallback={<LoadingSpinner />}><PlaylistDetailsPage /></Suspense> },
      { path: 'liked-songs', element: <Suspense fallback={<LoadingSpinner />}><LikedSongsPage /></Suspense> },
      { path: 'about', element: <Suspense fallback={<LoadingSpinner />}><AboutPage /></Suspense> },
      { path: 'premium', element: <Suspense fallback={<LoadingSpinner />}><PremiumPage /></Suspense> },
      { path: 'artists', element: <Suspense fallback={<LoadingSpinner />}><ArtistList /></Suspense> },
      { path: 'artist/:id', element: <Suspense fallback={<LoadingSpinner />}><ArtistTracks /></Suspense> },
    ],
  },
]);

const App = () => {
  return (
    <AppProvider>
      <RouterProvider router={router} />
      <ToastContainer position="top-right" autoClose={3000} theme="dark" />
    </AppProvider>
  );
};

export default App;
