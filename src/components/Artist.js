import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import data from '../Data/data.json'; // Import the JSON file

const Artist = () => {
  const [artists, setArtists] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setArtists(data.artists);
  }, []);

  const handleArtistClick = (artist) => {
    navigate(`/artist/${artist.id}`, { state: { tracks: artist.tracks, artistName: artist.name } });
  };

  return (
    <div className="m-2 p-2">
      <h1 className="text-center text-3xl font-extrabold mb-8">Top Bollywood Artists</h1>
      <div className="flex overflow-x-auto space-x-12 p-4">
        {artists.map((artist) => (
          <div
            key={artist.id}
            className="flex-shrink-0 text-center cursor-pointer"
            onClick={() => handleArtistClick(artist)}
          >
            <img
              src={artist.pic || 'https://via.placeholder.com/200'}
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
