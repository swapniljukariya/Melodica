import React, { useState } from 'react';
import { useAppContext } from '../Context/Globalstate'; // Import useAppContext
import { FaRegHeart, FaHeart } from 'react-icons/fa'; // Import the heart icons

const MusicCard = ({ track }) => {
  const [selectedPlaylist, setSelectedPlaylist] = useState('');
  const { playlists, addToPlaylist, addToLikedTracks, removeFromLikedTracks, likedTracks } = useAppContext();

  // Check if the track is already liked
  const isLiked = likedTracks.some((likedTrack) => likedTrack.id === track.id);

  // Handle Like/Unlike functionality
  const handleLikeClick = () => {
    if (isLiked) {
      removeFromLikedTracks(track); // Unlike the track
    } else {
      addToLikedTracks(track); // Like the track
    }
  };

  // Handle Add to Playlist functionality
  const handleAddToPlaylist = () => {
    if (selectedPlaylist) {
      addToPlaylist(selectedPlaylist, track);
      alert(`Added "${track.name}" to ${selectedPlaylist} playlist.`);
    } else {
      alert('Please select a playlist.');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:scale-105">
      {/* Album Image */}
      <img
        src={track.album?.images[0]?.url || 'https://via.placeholder.com/300'}
        alt={track.name}
        className="w-full h-56 object-cover"
      />

      {/* Track Details */}
      <div className="p-4">
        <h2 className="font-bold text-xl text-gray-800 truncate">{track.name}</h2>
        <p className="text-sm text-gray-600 truncate">
          {track.artists.map((artist) => artist.name).join(', ')}
        </p>
        <p className="text-sm text-gray-500">Release date: {track.album.release_date}</p>

        {/* Audio Player */}
        <audio controls src={track.preview_url} className="w-full mt-4 rounded" />

        {/* Buttons */}
        <div className="flex justify-between items-center mt-4">
          {/* Liked Button */}
          <button
            onClick={handleLikeClick}
            className={`px-4 py-2 rounded-lg text-white ${isLiked ? 'bg-red-500' : 'bg-gray-300 hover:bg-gray-400'}`}
          >
            {isLiked ? <FaHeart /> : <FaRegHeart />}
          </button>

          {/* Add to Playlist Button */}
          <button
            onClick={handleAddToPlaylist}
            className="px-4 py-2 bg-green-400 text-white rounded-lg hover:bg-blue-600"
          >
            Add to Playlist
          </button>
        </div>

        {/* Playlist Dropdown */}
        <div className="mt-4">
          <select
            value={selectedPlaylist}
            onChange={(e) => setSelectedPlaylist(e.target.value)}
            className="w-full bg-gray-200 p-2 border rounded-lg"
          >
            <option value="">Select Playlist</option>
            {Object.keys(playlists).map((playlistName) => (
              <option key={playlistName} value={playlistName}>
                {playlistName}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default MusicCard;
