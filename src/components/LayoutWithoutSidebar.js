import React from 'react';
import { Outlet } from 'react-router-dom';
import Navigation from './Navbar';  // Your header navigation component
import Footer from './footer';  // Your footer component

const LayoutWithoutSidebar = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <Navigation />

      {/* Main Content */}
      <main className="flex-1 bg-gray-100 p-6 overflow-y-auto">
        <Outlet /> {/* Render child routes */}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default LayoutWithoutSidebar;
