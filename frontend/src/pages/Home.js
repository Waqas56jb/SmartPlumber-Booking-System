import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Services from '../components/Services';
import Portfolio from '../components/Portfolio';
import CTA from '../components/CTA';
import Footer from '../components/Footer';
import Lightbox from '../components/Lightbox';
import Chatbot from '../components/Chatbot';
// i stack marketing sections for logged in customers on one scroll page
const Home = () => {
  return <>
      <Navbar />
      <Hero />
      <Services />
      <Portfolio />
      <CTA />
      <Footer />
      <Lightbox />
      <Chatbot />
    </>;
};
export default Home;
