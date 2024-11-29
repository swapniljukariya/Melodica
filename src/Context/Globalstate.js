import React, { createContext, useContext, useState } from 'react';

// Create a Context for the app
const AppContext = createContext();

// Create a custom hook to use the context
export const useAppContext = () => useContext(AppContext);

// The Provider component
export const AppProvider = ({ children }) => {
  const [likedTracks, setLikedTracks] = useState([]);
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

  const removeFromLikedTracks = (track) => {
    setLikedTracks((prevLikedTracks) =>
      prevLikedTracks.filter((likedTrack) => likedTrack.id !== track.id)
    );
  };
  // Function to add a track to a playlist
  const addToPlaylist = (playlistName, track) => {
    setPlaylists((prevPlaylists) => {
      const updatedPlaylists = { ...prevPlaylists };
      
      if (!updatedPlaylists[playlistName]) {
        updatedPlaylists[playlistName] = [];
      }
  
      // Prevent adding duplicate tracks to a playlist
      if (!updatedPlaylists[playlistName].find((t) => t.id === track.id)) {
        updatedPlaylists[playlistName] = [...updatedPlaylists[playlistName], track];
      }
  
      console.log('Updated playlists:', updatedPlaylists); // <-- Add this line to log the state
      return updatedPlaylists;
    });
  };
  

  // Function to remove a track from a playlist
  const removeFromPlaylist = (playlistName) => {
    setPlaylists((prevPlaylists) => {
      const updatedPlaylists = { ...prevPlaylists };
      delete updatedPlaylists[playlistName]; // Remove the playlist by name
      return updatedPlaylists;
    });
  };

  return (
    <AppContext.Provider
      value={{
        likedTracks,
        playlists,
        addToLikedTracks,
        addToPlaylist,
        removeFromPlaylist,
        removeFromLikedTracks
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
