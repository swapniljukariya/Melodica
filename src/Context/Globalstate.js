import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify'; // Import Toastify
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify CSS

// Create a Context for the app
const AppContext = createContext();

// Custom hook to use the context
export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  // Helper function to safely parse JSON
  const parseJSON = (value, defaultValue) => {
    try {
      return value ? JSON.parse(value) : defaultValue;
    } catch (error) {
      console.error('Error parsing JSON from localStorage:', error);
      return defaultValue;
    }
  };

  // Load data from localStorage or fallback to default
  const [likedTracks, setLikedTracks] = useState(() => {
    const savedLikedTracks = localStorage.getItem('likedTracks');
    console.log('Loaded likedTracks:', savedLikedTracks); // Debugging
    return parseJSON(savedLikedTracks, []);
  });

  const [playlists, setPlaylists] = useState(() => {
    const savedPlaylists = localStorage.getItem('playlists');
    console.log('Loaded playlists:', savedPlaylists); // Debugging
    return parseJSON(savedPlaylists, {
      'Workout 🏋️‍♂️': [],
      'Romantic❤️': [],
      'Traveling ✈️': [],
      'Chill Vibes': [],
      'Study & Focus': [],
      'Party 🎉': [],
      'RainyDay☔': [],
    });
  });

  // Update localStorage whenever likedTracks changes
  useEffect(() => {
    console.log('Saving likedTracks:', likedTracks); // Debugging
    localStorage.setItem('likedTracks', JSON.stringify(likedTracks));
  }, [likedTracks]);

  // Update localStorage whenever playlists change
  useEffect(() => {
    console.log('Saving playlists:', playlists); // Debugging
    localStorage.setItem('playlists', JSON.stringify(playlists));
  }, [playlists]);

  // Add a track to liked tracks
  const addToLikedTracks = (track) => {
    setLikedTracks((prevLikedTracks) => {
      if (!prevLikedTracks.find((likedTrack) => likedTrack.id === track.id)) {
        toast.success(`Added "${track.name}" to Liked Songs!`); // Toast notification
        return [...prevLikedTracks, track];
      }
      toast.warning(`"${track.name}" is already in Liked Songs.`);
      return prevLikedTracks;
    });
  };

  // Remove a track from liked tracks
  const removeFromLikedTracks = (track) => {
    setLikedTracks((prevLikedTracks) => {
      toast.info(`Removed "${track.name}" from Liked Songs.`); // Toast notification
      return prevLikedTracks.filter((likedTrack) => likedTrack.id !== track.id);
    });
  };

  // Add a track to a playlist
  const addToPlaylist = (playlistName, track) => {
    setPlaylists((prevPlaylists) => {
      const updatedPlaylists = { ...prevPlaylists };

      if (!updatedPlaylists[playlistName]) {
        updatedPlaylists[playlistName] = [];
      }

      if (!updatedPlaylists[playlistName].find((t) => t.id === track.id)) {
        updatedPlaylists[playlistName] = [...updatedPlaylists[playlistName], track];
        toast.success(`Added "${track.name}" to the playlist "${playlistName}"!`); // Toast notification
      } else {
        toast.warning(`"${track.name}" is already in the playlist "${playlistName}".`);
      }

      return updatedPlaylists;
    });
  };

  // Remove a playlist by its name
  const removeFromPlaylist = (playlistName, trackId) => {
    setPlaylists((prev) => ({
      ...prev,
      [playlistName]: prev[playlistName].filter((track) => track.id !== trackId),
    }));
  };
  return (
    <AppContext.Provider
      value={{
        likedTracks,
        playlists,
        addToLikedTracks,
        removeFromLikedTracks,
        addToPlaylist,
        removeFromPlaylist,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
