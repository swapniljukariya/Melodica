import React from 'react';
import { useParams } from 'react-router-dom';
import { useAppContext } from '../Context/Globalstate';

const PlaylistDetailsPage = () => {
  const { playlistName } = useParams(); // Get playlist name from URL
  const { playlists } = useAppContext();
  const playlist = playlists[playlistName]; // Get the playlist by name

  return (
    <div className="container bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-4 text-gray-800">{playlistName} Playlist</h1>
      {playlist && playlist.length > 0 ? (
        <ul>
          {playlist.map((song, index) => (
            <li key={index} className="p-2">
              <span>{song.name}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p>No songs in this playlist yet.</p>
      )}
    </div>
  );
};

export default PlaylistDetailsPage;
