import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MusicCard from './MusicCard';
import { useAppContext } from '../Context/Globalstate'; // Import the context
import ArtistList from './Artist'; // Component for displaying artists

const Home = () => {
  const { likedTracks, addToLikedTracks, removeFromLikedTracks, addToPlaylist } = useAppContext(); // Access global state
  const [trendingTracks, setTrendingTracks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const TRENDING_API_URL =
    'https://v1.nocodeapi.com/joy1234/spotify/uTmqICtNXxYRTCUc/search?q=trending&type=track';

  const SEARCH_API_URL = (query) =>
    `https://v1.nocodeapi.com/joy1234/spotify/uTmqICtNXxYRTCUc/search?q=${query}&type=track`;

  // Fetch trending tracks on component mount
  useEffect(() => {
    const fetchTrendingTracks = async () => {
      try {
        setLoading(true); // Set loading to true when fetching data
        const response = await axios.get(TRENDING_API_URL);
        const tracks = response.data?.tracks?.items || [];
        setTrendingTracks(tracks);
      } catch (err) {
        setError('Failed to load trending tracks. Please try again later.');
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchTrendingTracks();
  }, []);

  // Handle search functionality
  const handleSearch = async () => {
    if (!query.trim()) {
      alert('Please enter a search query!');
      return;
    }

    setIsSearching(true);
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(SEARCH_API_URL(query));
      const tracks = response.data?.tracks?.items || [];
      setSearchResults(tracks);
    } catch (err) {
      setError('Failed to fetch search results. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  // Handle Enter key press for search
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch(); // Trigger search when Enter key is pressed
    }
  };

  // Handle like button click (toggle like/unlike)
  const handleLikeClick = (track) => {
    if (likedTracks.some((likedTrack) => likedTrack.id === track.id)) {
      removeFromLikedTracks(track); // Remove if already liked
    } else {
      addToLikedTracks(track); // Add if not liked
    }
  };

  // Handle adding to playlist
  const handleAddToPlaylist = (playlistName, track) => {
    addToPlaylist(playlistName, track); // Add to the selected playlist
  };

  // Render shimmer effect while loading
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8 px-4 py-6">
        {[...Array(10)].map((_, index) => (
          <div key={index} className="animate-pulse bg-gray-300 h-64 w-full rounded-lg" />
        ))}
      </div>
    );
  }

  // Render error state
  if (error) {
    return <p className="text-center mt-8 text-red-500">{error}</p>;
  }

  // Determine which tracks to display (search results or trending tracks)
  const tracksToDisplay = isSearching ? searchResults : trendingTracks;

  return (
    <div className="homepage w-full min-h-screen flex flex-col bg-gray-150">
      <ArtistList />

      {/* Search Section */}
      <div className="w-full p-4">
        <div className="relative w-full max-w-4xl mx-auto">
          <input
            type="text"
            placeholder="Search for a song, artist, or album..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyPress} // Listen for Enter key press
            className="w-full py-3 px-4 text-lg sm:text-base md:text-sm border border-gray-300 rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400 bg-gray-100 transition-all duration-300"
          />
          <button
            onClick={handleSearch}
            className="absolute right-0 top-0 bottom-0 px-8 sm:px-10 text-white bg-gradient-to-r from-red-600 to-orange-500 rounded-full hover:from-red-700 hover:to-orange-600 focus:outline-none focus:ring-2 focus:ring-blue-500 font-semibold h-full transition-all duration-300"
          >
            Search
          </button>
        </div>
      </div>

      {/* Tracks Section */}
      <h1 className="text-center text-3xl font-extrabold mb-8">
        {isSearching ? `Search Results for "${query}"` : 'Trending Tracks in India'}
      </h1>

      {/* No Tracks Found */}
      {tracksToDisplay.length === 0 && (
        <p className="text-center mt-8">
          {isSearching
            ? `No results found for "${query}".`
            : 'No trending tracks available at the moment.'}
        </p>
      )}

      {/* Render Tracks */}
      <div className="flex-grow grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-8 px-4 py-6">
        {tracksToDisplay.map((track) => (
          <MusicCard
            key={track.id}
            track={track}
            onLike={() => handleLikeClick(track)}
            isLiked={likedTracks.some((likedTrack) => likedTrack.id === track.id)}
            onAddToPlaylist={handleAddToPlaylist} // Pass the function here
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
