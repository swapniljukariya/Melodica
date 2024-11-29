// src/components/PlaylistDetailsPage.js

import React from 'react';
import { useParams } from 'react-router-dom'; // For URL parameter
import { useAppContext } from '../Context/Globalstate'; // Access global state
import MusicCard from './MusicCard'; // Import MusicCard to display tracks

const PlaylistDetailsPage = () => {
  const { playlistName } = useParams(); // Get playlist name from the URL
  const { playlists } = useAppContext(); // Get playlists from global state

  const playlist = playlists[playlistName]; // Get the playlist by its name

  return (
    <div className="container bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-4 text-gray-800">{playlistName} </h1>
      
      {playlist && playlist.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {playlist.map((song, index) => (
            <MusicCard key={index} track={song} /> // Use MusicCard to display each track
          ))}
        </div>
      ) : (
        <p>No songs in this playlist yet.</p>
      )}
    </div>
  );
};

export default PlaylistDetailsPage;
