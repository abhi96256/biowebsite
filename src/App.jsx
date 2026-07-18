import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Stats from './components/Stats';
import About from './components/About';
import Quotes from './components/Quotes';
import Timeline from './components/Timeline';
import Impact from './components/Impact';
import Awards from './components/Awards';
import Legacy from './components/Legacy';
import MapSection from './components/MapSection';
import Tributes from './components/Tributes';
import Blog from './components/Blog';
import Footer from './components/Footer';
import Admin from './components/Admin/Admin';
import SmoothScroll from './components/SmoothScroll';
import GSAPScrollEffects from './components/GSAPScrollEffects';
import './App.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={
        <SmoothScroll>
          <GSAPScrollEffects />
          <div className="app-container selection-theme">
            <Navbar />
            <Hero />
            <Stats />
            <About />
            <Quotes />
            <Timeline />
            <Impact />
            <Awards />
            <Legacy />
            <MapSection />
            <Blog />
            <Tributes />
            <Footer />
          </div>
        </SmoothScroll>
      } />
      <Route path="/admin" element={<Admin />} />
    </Routes>
  );
}

export default App;
