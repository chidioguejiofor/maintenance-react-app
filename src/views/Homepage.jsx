import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';


import LandingBody from '../components/LandingBody';


const buttons = [
  {
    caption: 'Register',
    className: 'primary-button',
    link: '/signup',
  },
  {
    caption: 'Login',
    className: 'primary-button',
    link: '/login',
  },
];


const Homepage = () => (
  <div id="landing-page">
    <Header />
    <LandingBody
      buttons={buttons}
    />
    <Footer />
  </div>
);


export default Homepage;
