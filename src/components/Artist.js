import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ShimmerLoader from './ShimmerLoader'; // Import the shimmer loader component

const Artist = () => {
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const API_URL =
    '/search?q=bollywood&type=artist';

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

  if (loading) return <ShimmerLoader />; // Show shimmer while loading
  if (error) return <div className="text-center text-red-500">Error: {error}</div>;

  return (
    <div className="m-2 p-2">
      <h1 className="text-center text-4xl font-extrabold mb-8">Top Bollywood Artists</h1>
      <div className="flex overflow-x-auto space-x-12 p-4">
        {artists.map((artist) => (
          <div
            key={artist.id}
            className="flex-shrink-0 text-center cursor-pointer"
            onClick={() => navigate(`/artist/${artist.id}`)}
          >
            <img
              src={artist.images[0]?.url || 'https://via.placeholder.com/200'}
              alt={artist.name}
              className="w-40 h-40 rounded-full object-cover shadow-xl"
            />
            <p className="mt-4">{artist.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Artist;
