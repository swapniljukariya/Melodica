// src/components/LikedSongs.js
import React from 'react';
import { useAppContext } from '../Context/Globalstate'; // Import the context
import MusicCard from './MusicCard'; // MusicCard to display songs

const LikedSongsPage = () => {
  const { likedTracks } = useAppContext(); // Get liked tracks from global state

  return (
    <div className="liked-songs container mx-auto mt-8">
      <h1 className="text-center text-3xl font-bold mb-8">Liked Songs❤️</h1>

      {likedTracks.length === 0 ? (
        <p className="text-center text-xl">You haven't liked any songs yet!</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-8">
          {likedTracks.map((track) => (
            <MusicCard
              key={track.id}
              track={track}
              onLikeClick={() => {}}
              isLiked={true} // All these tracks are liked
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default LikedSongsPage;
