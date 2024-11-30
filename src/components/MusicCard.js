import React, { useState } from 'react';
import { useAppContext } from '../Context/Globalstate';
import { FaRegHeart, FaHeart } from 'react-icons/fa';
import { toast } from 'react-toastify';

const MusicCard = ({ track }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlaylist, setSelectedPlaylist] = useState('');
  const {
    playlists,
    addToPlaylist,
    removeFromPlaylist, // Use the new function
    addToLikedTracks,
    removeFromLikedTracks,
    likedTracks,
  } = useAppContext();

  // Check if the track is already liked
  const isLiked = likedTracks.some((likedTrack) => likedTrack.id === track.id);

  // Check if the track is already in the selected playlist
  const isInPlaylist = selectedPlaylist && playlists[selectedPlaylist]?.some((t) => t.id === track.id);

  // Handle Like/Unlike functionality
  const handleLikeClick = () => {
    if (isLiked) {
      removeFromLikedTracks(track);
      toast.info(`Removed "${track.name}" from liked songs`);
    } else {
      addToLikedTracks(track);
      toast.success(`Added "${track.name}" to liked songs`);
    }
  };

  // Handle Add to Playlist functionality
  const handleAddToPlaylist = () => {
    if (!selectedPlaylist || selectedPlaylist === 'none') {
      toast.error('Please select a valid playlist.');
      return;
    }

    if (!isInPlaylist) {
      addToPlaylist(selectedPlaylist, track);
      toast.success(`Added "${track.name}" to "${selectedPlaylist}" playlist`);
    } else {
      toast.error(`"${track.name}" is already in "${selectedPlaylist}" playlist`);
    }
  };

  // Handle Remove from Playlist functionality
  const handleRemoveFromPlaylist = () => {
    if (isInPlaylist) {
      removeFromPlaylist(selectedPlaylist, track.id);
      toast.info(`Removed "${track.name}" from "${selectedPlaylist}" playlist`);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:scale-105">
      <img
        src={track.album?.images[0]?.url || 'https://via.placeholder.com/300'}
        alt={track.name}
        className="w-full h-56 object-cover"
      />
      <div className="p-4">
        <h2 className="font-bold text-xl text-gray-800 truncate">{track.name}</h2>
        <p className="text-sm text-gray-600 truncate">
          {track.artists.map((artist) => artist.name).join(', ')}
        </p>
        <p className="text-sm text-gray-500">Release date: {track.album.release_date}</p>

        <audio controls src={track.preview_url} className="w-full mt-4 rounded" />

        <div className="flex justify-between items-center mt-4">
          <button
            onClick={handleLikeClick}
            className={`px-4 py-2 rounded-lg text-white ${isLiked ? 'bg-red-500' : 'bg-gray-300 hover:bg-gray-400'}`}
          >
            {isLiked ? <FaHeart /> : <FaRegHeart />}
          </button>

          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 bg-green-400 text-white rounded-lg hover:bg-blue-600"
          >
            {isInPlaylist ? 'Remove from Playlist' : 'Add to Playlist'}
          </button>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
          <div className="bg-white rounded-lg p-6 shadow-lg">
            <h3 className="text-lg font-bold mb-4">Select Playlist</h3>
            <select
              value={selectedPlaylist}
              onChange={(e) => setSelectedPlaylist(e.target.value)}
              className="w-full bg-gray-200 p-2 border rounded-lg mb-4"
            >
              <option value="">Select Playlist</option>
              <option value="none">None</option>
              {Object.keys(playlists).map((playlistName) => (
                <option key={playlistName} value={playlistName}>
                  {playlistName}
                </option>
              ))}
            </select>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-gray-400 text-white rounded-lg"
              >
                Cancel
              </button>
              <button onClick={handleAddToPlaylist} className="px-4 py-2 bg-green-400 text-white rounded-lg">
                Add
              </button>
              {isInPlaylist && (
                <button onClick={handleRemoveFromPlaylist} className="px-4 py-2 bg-red-400 text-white rounded-lg">
                  Remove
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MusicCard;
