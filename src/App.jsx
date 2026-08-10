import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Introduction from './components/Introduction';

import Mission from './components/Mission';
import About from './components/About';
import CoreValues from './components/CoreValues';
import Timeline from './components/Timeline';
import Leadership from './components/Leadership';
import VisionMission from './components/VisionMission';
import Initiatives from './components/Initiatives';
import Awards from './components/Awards';
import MediaGallery from './components/MediaGallery';
import Testimonials from './components/Testimonials';
import Blog from './components/Blog';
import FAQs from './components/FAQs';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Admin from './components/Admin/Admin';
import SmoothScroll from './components/SmoothScroll';
import GSAPScrollEffects from './components/GSAPScrollEffects';
import './App.css';
import './mobile.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={
        <SmoothScroll>
          <GSAPScrollEffects />
          <div className="app-container selection-theme">
            <Navbar />
            <Hero />
            <Introduction />
           
            <Mission />
            <About />
            <CoreValues />
            <Timeline />
            <Leadership />
            <VisionMission />
            <Initiatives />
            <Awards />
            <MediaGallery />
            <Testimonials />
            <Blog />
            <FAQs />
            <Contact />
            <Footer />
          </div>
        </SmoothScroll>
      } />
      <Route path="/admin" element={<Admin />} />
    </Routes>
  );
}

export default App;
