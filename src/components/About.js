import React from "react";
import cover from '../img/MicrosoftTeams-image-1.jpg';
const AboutUs = () => {
  return (
    <section className="about-section max-w-10xl mx-auto py-16 px-4 md:px-8 lg:px-16 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
      {/* Image Section */}
      <div>
        <img
          src={cover} // Replace with the actual image URL
          alt="Spotify Bubble"
          className="rounded-lg shadow-lg w-full h-5/6 "
        />
      </div>

      {/* Text Section */}
      <div>
        <h1 className="text-5xl font-extrabold text-gray-900 leading-tight mb-6">
          About Melodica
        </h1>
        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          Melodica’s mission is to unlock the potential of human creativity by
          giving a million creative artists the opportunity to live off their
          art and billions of fans the opportunity to enjoy and be inspired by
          it. Melodica’s platform revolutionized music listening forever when we
          launched in 2008. Our move into podcasting brought innovation and a
          new generation of listeners to the medium, and in 2022 we entered the
          next audio market primed for growth with the addition of audiobooks.
        </p>
        <p className="text-lg text-gray-700 leading-relaxed">
          Today, more listeners than ever can discover, manage and enjoy over
          100 million tracks, 6 million podcasts titles, and 350,000 audiobooks
          à la carte on Spotify. We are the world’s most popular audio
          streaming subscription service with more than 640 million users,
          including 262 million subscribers in more than 180 markets.
        </p>
      </div>
    </section>
  );
};

export default AboutUs;
