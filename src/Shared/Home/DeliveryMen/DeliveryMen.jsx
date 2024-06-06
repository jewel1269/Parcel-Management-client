import React, { useState, useEffect } from 'react';
import { FaStar } from 'react-icons/fa';
import useAxiosInstance from '../../../Hooks/useAxiosInstance';
import { useQuery } from '@tanstack/react-query';

const DeliveryMen = () => {
  const axiosInstance = useAxiosInstance();
  const { data: deliveryMen = [] } = useQuery({
    queryKey: ['feature'],
    queryFn: async () => {
      const res = await axiosInstance.get(`/features`);
      return res.data;
    },
  });

  return (
    <div className="container mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-center mb-8">Top Delivery Men</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {deliveryMen.map((man, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center w-full max-w-sm mx-auto m-4"
          >
            <div
              className="w-full h-64 bg-gray-300 bg-center bg-cover rounded-lg shadow-md"
              style={{
                backgroundImage: `url(${man.image})`,
              }}
            ></div>

            <div className="w-56 -mt-10 overflow-hidden bg-white rounded-lg shadow-lg md:w-64 dark:bg-gray-800">
              <h3 className="py-2 font-bold tracking-wide text-center text-gray-800 uppercase dark:text-white">
                {man.name}
              </h3>

              <div className="px-3 py-2 bg-white dark:bg-gray-800 text-center">
                <p className="text-gray-800 dark:text-gray-200">
                  Parcels Delivered: {man.parcelsDelivered}
                </p>
                <p className="text-gray-800 dark:text-gray-200">
                  Average Rating: {man.averageRating} ⭐
                </p>
              </div>

              <div className="flex items-center justify-between px-3 py-2 bg-gray-200 dark:bg-gray-700">
                <span className="font-bold text-gray-800 dark:text-gray-200">
                  View Profile
                </span>
                <button className="px-2 py-1 text-xs font-semibold text-white uppercase transition-colors duration-300 transform bg-gray-800 rounded hover:bg-gray-700 dark:hover:bg-gray-600 focus:bg-gray-700 dark:focus:bg-gray-600 focus:outline-none">
                  Contact
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DeliveryMen;
