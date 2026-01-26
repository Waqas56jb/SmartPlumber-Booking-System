import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ContactStrip from './components/ContactStrip';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Portfolio from './components/Portfolio';
import CTA from './components/CTA';
import Footer from './components/Footer';
import MobileBar from './components/MobileBar';
import Lightbox from './components/Lightbox';

function App() {
  return (
    <div className="App">
      <ContactStrip />
      <Navbar />
      <Hero />
      <Services />
      <Portfolio />
      <CTA />
      <Footer />
      <MobileBar />
      <Lightbox />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}

export default App;
