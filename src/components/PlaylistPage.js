import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../Context/Globalstate';

const PlaylistPage = () => {
  const { playlists } = useAppContext();
  const navigate = useNavigate();

  // Navigate to playlist details page
  const handlePlaylistClick = (playlistName) => {
    navigate(`/playlist/${playlistName}`);
  };

  return (
    <div className="container bg-red-900 mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4 text-gray-800">Your Playlists</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {Object.keys(playlists).map((playlistName) => (
          <div
            key={playlistName}
            className="bg-white rounded-lg shadow-lg p-4 cursor-pointer"
            onClick={() => handlePlaylistClick(playlistName)}
          >
            <h2 className="text-xl font-bold mb-4 text-gray-800">{playlistName}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlaylistPage;
