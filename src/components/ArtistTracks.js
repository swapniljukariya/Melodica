import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import MusicCard from './MusicCard'; // Import MusicCard
import { useAppContext } from '../Context/Globalstate'; // Import context

const ArtistTracks = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { tracks, artistName } = location.state || {};

  const {
    likedTracks,
    addToLikedTracks,
    removeFromLikedTracks,
    addToPlaylist,
  } = useAppContext();

  // Handle missing state data
  if (!tracks || !artistName) {
    navigate('/artists');
    return null;
  }

  // Default values for missing track data
  const defaultImage = 'https://via.placeholder.com/300';
  const defaultReleaseDate = 'Unknown';
  const defaultPreviewUrl = null;

  // Preprocess tracks to ensure required properties are present
  const processedTracks = tracks.map((track, index) => ({
    ...track,
    id: track.id || `track-${index}`, // Ensure unique ID
    name: track.name || 'Unknown Track',
    artists: track.artists || [{ name: artistName }],
    album: {
      images: [{ url: track.img_url || defaultImage }],
      release_date: track.release_date || defaultReleaseDate,
    },
    preview_url: track.preview_url || defaultPreviewUrl,
  }));

  return (
    <div className="m-4">
      <h1 className="text-center text-3xl font-extrabold mb-8">{artistName}'s Tracks</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {processedTracks.map((track) => {
          const isLiked = likedTracks.some((likedTrack) => likedTrack.id === track.id);

          return (
            <MusicCard
              key={track.id}
              track={track}
              isLiked={isLiked}
              onLike={() => {
                if (isLiked) {
                  removeFromLikedTracks(track);
                } else {
                  addToLikedTracks(track);
                }
              }}
              onAddToPlaylist={(playlistName) => addToPlaylist(playlistName, track)}
            />
          );
        })}
      </div>

      {/* Navigation button to return to the artist list */}
      <div className="flex justify-center mt-8">
        <button
          onClick={() => navigate('/artists')}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Back to Artists
        </button>
      </div>
    </div>
  );
};

export default ArtistTracks;
