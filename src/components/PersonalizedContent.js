import React, { useEffect, useState } from "react";
import axios from "axios";

function PersonalizedContent() {
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const response = await axios.get("https://api.spotify.com/v1/recommendations", {
          headers: {
            Authorization: `Bearer YOUR_ACCESS_TOKEN`,
          },
        });
        setRecommendations(response.data.tracks);
      } catch (error) {
        console.error("Error fetching recommendations:", error);
      }
    };

    fetchRecommendations();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {recommendations.map((track) => (
        <div
          key={track.id}
          className="p-4 bg-gray-800 text-white rounded-lg shadow-md hover:scale-105 transition-transform duration-200"
        >
          <img
            src={track.album.images[0].url}
            alt={track.name}
            className="w-full h-40 object-cover rounded-lg mb-4"
          />
          <h3 className="text-xl font-bold mb-2">{track.name}</h3>
          <p className="text-sm text-gray-400">{track.artists[0].name}</p>
        </div>
      ))}
    </div>
  );
}

export default PersonalizedContent;
