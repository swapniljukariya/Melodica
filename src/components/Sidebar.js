import React from 'react';
import { Outlet } from 'react-router-dom';  // Important for nested routes
import Navigation from './Navigation';     // Import the Navigation bar

const SidebarLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />  {/* Your header/navigation component */}
      
      <div className="flex-grow">
        {/* This is where the route-specific content will be displayed */}
        <Outlet />  {/* This is the placeholder for route-specific content */}
      </div>

      {/* Footer section can go here */}
      <footer className="p-4 bg-gray-800 text-white text-center">
        &copy; 2024 Melodica. All rights reserved.
      </footer>
    </div>
  );
};

export default SidebarLayout;
