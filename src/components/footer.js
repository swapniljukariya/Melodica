import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMicrophoneAlt,
  faPalette,
  faHeadset,
  faUserAlt,
  faBuilding,
} from "@fortawesome/free-solid-svg-icons";
import {
  faInstagram,
  faTwitter,
  faFacebook,
} from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-8">
      {/* Footer Content */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16 grid grid-cols-2 md:grid-cols-4 gap-6">
        {/* Spotify Logo */}
        <div>
          <h2 className="text-lg font-bold mb-4">Spotify</h2>
          <p className="text-gray-400 text-sm">
            &copy; 2024 Spotify AB.
          </p>
        </div>

        {/* Communities */}
        <div>
          <h3 className="text-sm font-semibold mb-4">COMMUNITIES</h3>
          <ul className="space-y-2">
            <li className="flex items-center space-x-2">
              <FontAwesomeIcon icon={faMicrophoneAlt} />
              <span>For Artists</span>
            </li>
            <li className="flex items-center space-x-2">
              <FontAwesomeIcon icon={faUserAlt} />
              <span>For Creators</span>
            </li>
            <li className="flex items-center space-x-2">
              <FontAwesomeIcon icon={faBuilding} />
              <span>For Advertisers</span>
            </li>
            <li className="flex items-center space-x-2">
              <FontAwesomeIcon icon={faPalette} />
              <span>Life at Spotify</span>
            </li>
            <li className="flex items-center space-x-2">
              <FontAwesomeIcon icon={faHeadset} />
              <span>For Design</span>
            </li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h3 className="text-sm font-semibold mb-4">COMPANY</h3>
          <ul className="space-y-2">
            <li>About</li>
            <li>Jobs</li>
            <li>Investors</li>
          </ul>
        </div>

        {/* Useful Links */}
        <div>
          <h3 className="text-sm font-semibold mb-4">USEFUL LINKS</h3>
          <ul className="space-y-2">
            <li>Help</li>
            <li>Web Player</li>
          </ul>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16 flex flex-col md:flex-row items-center justify-between mt-8 border-t border-gray-700 pt-4">
        <p className="text-sm text-gray-400">
          Legal | Privacy Center | Cookies | About Ads
        </p>
        <div className="flex space-x-4 mt-4 md:mt-0">
          <a href="#" aria-label="Instagram" className="text-gray-400 hover:text-white">
            <FontAwesomeIcon icon={faInstagram} size="lg" />
          </a>
          <a href="#" aria-label="Twitter" className="text-gray-400 hover:text-white">
            <FontAwesomeIcon icon={faTwitter} size="lg" />
          </a>
          <a href="#" aria-label="Facebook" className="text-gray-400 hover:text-white">
            <FontAwesomeIcon icon={faFacebook} size="lg" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
