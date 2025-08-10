import React from 'react';
import ParallaxHeadings from '../components/Home/ParallaxHeadings';
import Navbar from '../components/Home/Navbar';
import Freatures from '../components/Home/Freatures';
import QuickAction from '../components/Home/QuickAction';
import Footer from '../components/Home/Footer';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header>
        <Navbar />
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        <section aria-label="Hero Section with Parallax Animation">
          <ParallaxHeadings />
        </section>
        <section aria-label="Key Features" className="py-12 bg-white">
          <Freatures />
        </section>
        <section aria-label="Quick Action Links" className="bg-gray-50 py-12">
          <QuickAction />
        </section>
      </main>
      <footer className="bg-white text-gray-700 h-[60px] flex items-center"   role="contentinfo">
        <Footer />
      </footer>
    </div>
  );
};

export default HomePage;
