import React from 'react';
import Banner from './Banner/Banner';
import FeaturesSection from './FeaturesSection/FeaturesSection';
import DeliveryMen from './DeliveryMen/DeliveryMen';
import { Helmet } from 'react-helmet-async';

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>Parcel Patah | Home</title>
      </Helmet>
      <Banner />
      <FeaturesSection />
      <DeliveryMen />
    </div>
  );
};

export default Home;
