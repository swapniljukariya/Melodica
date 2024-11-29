import React, { useState } from 'react';
import MusicCard from './MusicCard'; // Import the MusicCard component

const Search = () => {
  const [query, setQuery] = useState('');
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searched, setSearched] = useState(false);
  const [likedTracks, setLikedTracks] = useState([]);

  const handleSearch = async () => {
    if (!query.trim()) {
      alert('Please enter a search query!');
      return;
    }

    const API_URL = `https://v1.nocodeapi.com/swapniljukariya/spotify/oDYIPEwQTXedUfUF/search?q=${query}&type=track`;

    setLoading(true);
    setError(null);
    setSearched(true);

    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      setTracks(data.tracks?.items || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLikeClick = (track) => {
    setLikedTracks((prev) =>
      prev.includes(track.id) ? prev.filter((id) => id !== track.id) : [...prev, track.id]
    );
  };

  const handleAddToPlaylistClick = (track) => {
    console.log(`Add ${track.name} to playlist`);
  };

  return (
    <div className="bg-blue-100 min-h-screen">
      {/* Search Section */}
      <div className="container mx-auto mt-8 p-4">
        <div className="flex justify-center items-center mb-10">
          <div className="relative w-full max-w-lg">
            <input
              type="text"
              placeholder="Search for a song, artist, or album..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full p-4 text-lg border rounded-full shadow focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500"
            />
            <button
              onClick={handleSearch}
              className="absolute right-0 top-0 bottom-0 px-6 text-white bg-blue-600 rounded-r-full hover:bg-blue-700 focus:outline-none"
            >
              Search
            </button>
          </div>
        </div>

        {/* Loading Indicator */}
        {loading && <p className="text-center text-lg font-semibold text-gray-600">Loading...</p>}

        {/* Error Message */}
        {error && (
          <p className="text-center text-red-500 font-bold text-lg">
            Error: {error}
          </p>
        )}

        {/* No Results Found */}
        {!loading && !error && searched && tracks.length === 0 && (
          <div className="text-center mt-10">
            <p className="text-lg font-semibold text-gray-600 mb-4">
              No results found for "{query}"
            </p>
          </div>
        )}

        {/* Tracks Display */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6">
          {tracks.map((track) => (
            <MusicCard
              key={track.id}
              track={track}
              onLikeClick={handleLikeClick}
              onAddToPlaylistClick={handleAddToPlaylistClick}
              isLiked={likedTracks.includes(track.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Search;
