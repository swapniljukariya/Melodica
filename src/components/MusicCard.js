import React, { useState } from 'react';
import { FaRegHeart, FaHeart } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { useAppContext } from '../Context/Globalstate';

const MusicCard = ({ track, isLiked, onLike, onAddToPlaylist }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlaylist, setSelectedPlaylist] = useState('');
  const { playlists } = useAppContext();

  const handleAddToPlaylist = () => {
    if (!selectedPlaylist || selectedPlaylist === 'none') {
      toast.error('Please select a valid playlist.');
      return;
    }

    // Call onAddToPlaylist with the selected playlist and track
    if (typeof onAddToPlaylist === 'function') {
      onAddToPlaylist(selectedPlaylist, track);
      toast.success(`Added "${track.name}" to "${selectedPlaylist}" playlist`);
      setIsModalOpen(false);
    } else {
      console.error('onAddToPlaylist is not a function'); // Debugging log
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
        <p className="text-sm text-gray-600 truncate">{track.artists?.map(artist => artist.name).join(', ') || 'Unknown Artist'}</p>
        <p className="text-sm text-gray-500">Release date: {track.album?.release_date || 'Unknown'}</p>
        <audio controls src={track.preview_url || null} className="w-full mt-4 rounded" />

        <div className="flex justify-between items-center mt-4">
          {/* Like Button */}
          <button
            onClick={onLike}
            className={`px-4 py-2 rounded-lg text-white ${isLiked ? 'bg-red-500' : 'bg-gray-300 hover:bg-gray-400'}`}
          >
            {isLiked ? <FaHeart /> : <FaRegHeart />}
          </button>

          {/* Add to Playlist Button */}
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 bg-green-400 text-white rounded-lg hover:bg-blue-600"
          >
            Add to Playlist
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
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MusicCard;

