import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../Context/Globalstate';

const PlaylistPage = () => {
  const { playlists, addToPlaylist, removeFromPlaylist } = useAppContext();
  const navigate = useNavigate();
  const [newPlaylistName, setNewPlaylistName] = useState('');
  const [isCreatingPlaylist, setIsCreatingPlaylist] = useState(false);

  // Navigate to playlist details page
  const handlePlaylistClick = (playlistName) => {
    navigate(`/playlist/${playlistName}`);
  };

  // Handle create playlist
  const handleCreatePlaylist = () => {
    if (!newPlaylistName.trim()) {
      alert('Please enter a playlist name!');
      return;
    }

    // Add the new playlist to the playlists state
    addToPlaylist(newPlaylistName, []);
    setNewPlaylistName(''); // Clear input
    setIsCreatingPlaylist(false); // Close the input field
  };

  // Handle delete playlist
  const handleDeletePlaylist = (playlistName) => {
    const confirmDelete = window.confirm(`Are you sure you want to delete the playlist "${playlistName}"?`);
    if (confirmDelete) {
      removeFromPlaylist(playlistName);
    }
  };

  return (
    <div className="container bg-red-900 mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4 text-gray-800">Your Playlists</h1>

      {/* Create Playlist Button */}
      <button
        onClick={() => setIsCreatingPlaylist(!isCreatingPlaylist)}
        className="mb-4 px-6 py-2 bg-green-500 text-white rounded-md"
      >
        {isCreatingPlaylist ? 'Cancel' : 'Create Playlist'}
      </button>

      {/* Create Playlist Input */}
      {isCreatingPlaylist && (
        <div className="mb-4">
          <input
            type="text"
            placeholder="Enter playlist name"
            value={newPlaylistName}
            onChange={(e) => setNewPlaylistName(e.target.value)}
            className="p-2 border border-gray-300 rounded-md"
          />
          <button
            onClick={handleCreatePlaylist}
            className="ml-2 px-4 py-2 bg-green-500 text-white rounded-md"
          >
            Create
          </button>
        </div>
      )}

      {/* Playlist List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {Object.keys(playlists).map((playlistName) => (
          <div
            key={playlistName}
            className="bg-white rounded-lg shadow-lg p-4 cursor-pointer relative"
            onClick={() => handlePlaylistClick(playlistName)}
          >
            <h2 className="text-xl font-bold mb-4 text-gray-800">{playlistName}</h2>
            
            {/* Delete Button */}
            <button
              onClick={(e) => {
                e.stopPropagation(); // Prevent triggering playlist click
                handleDeletePlaylist(playlistName);
              }}
              className="absolute top-2 right-2 text-red-500"
            >
              🗑️
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlaylistPage;
