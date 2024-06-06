import { useQuery } from '@tanstack/react-query';
import React, { useState, useEffect, useContext } from 'react';
import CountUp from 'react-countup';
import { AuthContext } from '../../../Componant/AuthProvider/AuthProvider';
import useAxiosInstance from '../../../Hooks/useAxiosInstance';
import { AccordionItem } from 'react-bootstrap';

const FeaturesSection = () => {
  const { refetch, data: AllParcels = [] } = useQuery({
    queryKey: ['AllParcel'],
    queryFn: async () => {
      const res = await axiosInstance.get(`/bookings`);
      return res.data;
    },
  });

  const axiosInstance = useAxiosInstance();
  const { data: icons = [] } = useQuery({
    queryKey: ['icons'],
    queryFn: async () => {
      const res = await axiosInstance.get(`/icons`);
      return res.data;
    },
  });
  console.log(icons);

  const { data: users = [] } = useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      const res = await axiosInstance.get(`/users`);
      return res.data;
    },
  });

  const { data: bookingsDelivered = [] } = useQuery({
    queryKey: ['delivered'],
    queryFn: async () => {
      const res = await axiosInstance.get(
        '/bookingsDelivered?status=Delivered'
      );
      return res.data;
    },
  });

  return (
    <section className="features containe lg:ml-10 lg:mr-10 mx-auto py-12 px-4 md:px-8">
      <h2 className="text-3xl font-bold text-center mb-8">
        Our Powerful Features
      </h2>
      <div className="grid gap-8 md:grid-cols-3">
        {icons.map((item, index) => (
          <div
            key={index}
            className="w-full max-w-md px-8 py-4 mt-16 bg-white rounded-lg shadow-lg dark:bg-gray-800"
          >
            <div className="flex justify-center -mt-16 md:justify-end">
              <img
                className="object-cover w-28 h-28 border-2 p-1 border-blue-500 rounded-full dark:border-blue-400"
                alt="Testimonial avatar"
                src={item?.icon}
              />
            </div>

            <h2 className="mt-2 text-xl font-semibold text-gray-800 dark:text-white md:mt-0">
              ⭐{item.title}
            </h2>

            <p className="mt-2 text-sm text-gray-600 dark:text-gray-200">
              🔥 {item.description}
            </p>
          </div>
        ))}
      </div>

      <div className="grid gap-8 mt-12 md:grid-cols-3">
        <div className="rounded h-24 shadow-md  text-center">
          <h3 className="text-xl font-medium mb-2">Total Parcels Booked</h3>
          <CountUp
            end={AllParcels.length}
            duration={3.5}
            separator=","
            decimals={0}
          >
            {({ countUpRef }) => (
              <span
                ref={countUpRef}
                className="text-4xl font-semibold text-orange-400"
              />
            )}
          </CountUp>
        </div>
        <div className="rounded h-24  shadow-md  text-center">
          <h3 className="text-xl font-medium mb-2">Total Parcels Delivered</h3>
          <CountUp
            end={bookingsDelivered.length}
            duration={2.5}
            separator=","
            decimals={0}
          >
            {({ countUpRef }) => (
              <span
                ref={countUpRef}
                className="text-4xl font-semibold text-orange-400 "
              />
            )}
          </CountUp>
        </div>
        <div className="rounded h-24  shadow-md text-center">
          <h3 className="text-xl font-medium mb-2">Total Users</h3>
          <CountUp
            end={users.length}
            duration={2.5} // Adjust animation duration as needed
            separator=","
            decimals={0} // Adjust decimals based on your data format
          >
            {({ countUpRef }) => (
              <span
                ref={countUpRef}
                className="text-4xl font-semibold text-orange-400"
              />
            )}
          </CountUp>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
