import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const ArtistTracksPage = () => {
  const { artistId } = useParams(); // Get artistId from URL
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // API endpoint
  const API_URL = `https://v1.nocodeapi.com/ashishsingh/spotify/kqBiFZociAEOnmJh/artists?id=${artistId}`;

  useEffect(() => {
    const fetchTracks = async () => {
      try {
        const requestOptions = {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        };

        const response = await fetch(API_URL, requestOptions);
        if (!response.ok) {
          throw new Error('Failed to fetch artist data');
        }

        const data = await response.json();

        // Check the structure of the response
        console.log('Artist data:', data);

        // Extract top tracks or related data
        const tracksData = data.tracks || []; // Update the path based on the actual API response structure

        // Update state
        setTracks(tracksData);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching artist data:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchTracks();
  }, [artistId]); // Re-run when artistId changes

  // Render loading, error, or tracks
  if (loading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-center text-red-500">Error: {error}</div>;
  if (!tracks.length) return <div className="text-center">No tracks found for this artist.</div>;

  return (
    <div className="m-2 p-2">
      <h1 className="text-center text-4xl font-extrabold mb-8">Top Tracks</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {tracks.map((track) => (
          <div key={track.id} className="bg-white rounded-lg shadow-lg p-4">
            <img
              src={track.album?.images[0]?.url || 'https://via.placeholder.com/200'}
              alt={track.name}
              className="w-full h-40 object-cover rounded-lg"
            />
            <p className="mt-4 text-center">{track.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArtistTracksPage;
