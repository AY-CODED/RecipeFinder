import React from 'react';
import { ChefHat } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <div className="flex items-center gap-3 group cursor-pointer" onClick={() => window.location.reload()}>
            <div className="bg-orange-500 p-2 rounded-2xl group-hover:rotate-12 transition-transform duration-300">
              <ChefHat className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-black text-gray-900 tracking-tight">
              Recipe<span className="text-orange-500">Finder</span>
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-8">
            <a href="#" className="text-sm font-bold text-gray-900 hover:text-orange-500 transition-colors">Home</a>
            <a href="#" className="text-sm font-bold text-gray-500 hover:text-orange-500 transition-colors">Discover</a>
            <a href="#" className="text-sm font-bold text-gray-500 hover:text-orange-500 transition-colors">Community</a>
          </div>

          <button className="bg-gray-900 text-white px-6 py-2.5 rounded-2xl text-sm font-bold hover:bg-gray-800 transition-all hover:shadow-lg hover:shadow-gray-200 active:scale-95">
            Sign In
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
