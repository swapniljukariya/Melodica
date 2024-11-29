import React, { createContext, useContext, useState } from 'react';

// Create a Context for the app
const AppContext = createContext();

// Create a custom hook to use the context
export const useAppContext = () => useContext(AppContext);

// The Provider component
export const AppProvider = ({ children }) => {
  const [likedTracks, setLikedTracks] = useState([]); // Array to hold liked tracks
  const [playlists, setPlaylists] = useState({
    'Workout 🏋️‍♂️': [],
    'Romantic❤️': [],
    'Traveling ✈️': [],
    'Chill Vibes': [],
    'Study & Focus': [],
    'Party 🎉': [],
    'RainyDay☔': [],
  });

  // Function to add a track to liked tracks
  const addToLikedTracks = (track) => {
    setLikedTracks((prevLikedTracks) => {
      if (!prevLikedTracks.find((likedTrack) => likedTrack.id === track.id)) {
        return [...prevLikedTracks, track];
      }
      return prevLikedTracks;
    });
  };

  // Function to remove a track from liked tracks
  const removeFromLikedTracks = (track) => {
    setLikedTracks((prevLikedTracks) =>
      prevLikedTracks.filter((likedTrack) => likedTrack.id !== track.id)
    );
  };

  // Function to toggle a track in the liked tracks
  const toggleLikedTrack = (track) => {
    if (likedTracks.some((likedTrack) => likedTrack.id === track.id)) {
      removeFromLikedTracks(track); // Remove if already liked
    } else {
      addToLikedTracks(track); // Add if not liked
    }
  };

  // Function to add a track to a specific playlist
  const addToPlaylist = (playlistName, track) => {
    setPlaylists((prevPlaylists) => {
      const updatedPlaylists = { ...prevPlaylists };
      if (!updatedPlaylists[playlistName].find((t) => t.id === track.id)) {
        updatedPlaylists[playlistName] = [...updatedPlaylists[playlistName], track];
      }
      return updatedPlaylists;
    });
  };

  // Function to remove a track from a specific playlist
  const removeFromPlaylist = (playlistName, track) => {
    setPlaylists((prevPlaylists) => {
      const updatedPlaylists = { ...prevPlaylists };
      updatedPlaylists[playlistName] = updatedPlaylists[playlistName].filter(
        (t) => t.id !== track.id
      );
      return updatedPlaylists;
    });
  };

  return (
    <AppContext.Provider
      value={{
        likedTracks,
        playlists,
        addToLikedTracks,
        removeFromLikedTracks,
        toggleLikedTrack,
        addToPlaylist,
        removeFromPlaylist,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
