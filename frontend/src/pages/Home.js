import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Services from '../components/Services';
import Portfolio from '../components/Portfolio';
import CTA from '../components/CTA';
import Footer from '../components/Footer';
import MobileBar from '../components/MobileBar';
import Lightbox from '../components/Lightbox';
import Chatbot from '../components/Chatbot';

const Home = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <Services />
      <Portfolio />
      <CTA />
      <Footer />
      <MobileBar />
      <Lightbox />
      <Chatbot />
    </>
  );
};

export default Home;
