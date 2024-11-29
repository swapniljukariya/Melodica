// components/TrackList.jsx
function TrackList({ tracks }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {tracks.map((track) => (
        <div key={track.id} className="bg-gray-800 text-white p-4 rounded-md shadow-md">
          <img src={track.album.images[0].url} alt={track.name} className="w-full h-40 object-cover rounded-md mb-4" />
          <h3 className="font-semibold">{track.name}</h3>
          <p>{track.artists[0].name}</p>
          <audio controls src={track.preview_url} className="w-full mt-2" />
        </div>
      ))}
    </div>
  );
}

export default TrackList;
