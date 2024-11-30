import React, { useState, useEffect } from 'react';

const Artist = () => {
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_URL =
    'https://v1.nocodeapi.com/swapniljukariya149/spotify/UHGSDlioaLkenoUb/search?q=bollywood&type=artist';

  useEffect(() => {
    const fetchArtists = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setArtists(data.artists.items);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchArtists();
  }, []);

  // Shimmer effect while loading
  if (loading) {
    return (
      <div className="m-2 p-2">
        <h1 className="text-center text-3xl font-extrabold mb-8">Top Bollywood Artists</h1>
        <div className="flex overflow-x-auto space-x-12 p-4">
          {[...Array(6)].map((_, index) => (
            <div
              key={index}
              className="flex-shrink-0 text-center animate-pulse"
            >
              <div className="w-36 h-36 rounded-full bg-gray-300" />
              <div className="mt-4 w-24 h-4 bg-gray-300 rounded" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Render error state
  if (error) {
    return <div className="text-center text-red-500">Error: {error}</div>;
  }

  // Render artists when data is loaded
  return (
    <div className="m-2 p-2">
      <h1 className="text-center text-3xl font-extrabold mb-8">Top Bollywood Artists</h1>
      <div className="flex overflow-x-auto space-x-12 p-4">
        {artists.map((artist) => (
          <div
            key={artist.id}
            className="flex-shrink-0 text-center"
            onClick={() => {
              console.log(`Artist clicked: ${artist.name}`);
            }}
          >
            <img
              src={artist.images[0]?.url || 'https://via.placeholder.com/200'}
              alt={artist.name}
              className="w-36 h-36 rounded-full object-cover shadow-xl"
            />
            <p className="mt-4">{artist.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Artist;
