import React from 'react';
import Footer from '../../components/global/Footer';
import Navbar from '../../components/global/Navbar';
import { AboutContent } from '../../components/AboutContent';

const AboutPage: React.FC = () => {
  return (
    <>
      <Navbar />

      <AboutContent />

      <Footer />
    </>
  );
};

export default AboutPage;
