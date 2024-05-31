import React from 'react';
import bgImage from '../../../assets/rm373batch2-02.jpg';
import deliver from '../../../assets/160139-OV2ZS8-552-removebg-preview (1).png';

const Banner = () => {
  return (
    <div className="relative">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${bgImage})`,
          filter: 'blur(5px)',
          zIndex: -1,
        }}
      ></div>

      {/* Overlay to darken the image */}
      <div
        className="absolute inset-0 bg-black opacity-50"
        style={{ zIndex: -1 }}
      ></div>

      {/* Content */}
      <div className="flex justify-center lg:gap-20 items-center">
        <div className="relative flex flex-col items-center justify-center h-screen">
          <div className="text-center text-white mb-8">
            <h1 className="text-4xl md:text-6xl font-bold">
              Express Home Delivery
            </h1>
            <p className="mt-4 max-w-md mx-auto">
              "Experience swift and reliable doorstep delivery. Our service
              ensures your packages arrive quickly and safely, making your life
              easier and more convenient every day."
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative w-full max-w-md">
            <input
              type="text"
              className="w-full px-4 py-2 pr-12 text-black rounded-lg focus:outline-none"
              placeholder="Search for delivery services..."
            />
            <button className="absolute top-0 right-0 px-4 py-2 bg-yellow-500 text-black font-bold rounded-lg hover:bg-yellow-600">
              Search
            </button>
          </div>

          {/* Read More Button */}
          <button className="mt-6 px-4 py-2 bg-yellow-500 text-black font-bold rounded-lg hover:bg-yellow-600">
            Read More
          </button>
        </div>
        <div>
          <img src={deliver} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Banner;
