import { useQuery } from '@tanstack/react-query';
import React, { useState, useEffect, useContext } from 'react';
import CountUp from 'react-countup';
import { AuthContext } from '../../../Componant/AuthProvider/AuthProvider';
import useAxiosInstance from '../../../Hooks/useAxiosInstance';

const FeaturesSection = () => {
  const [stats, setStats] = useState({
    parcelsBooked: 110,
    parcelsDelivered: 230,
    usersRegistered: 3420,
  });

  const { refetch, data: AllParcels = [] } = useQuery({
    queryKey: ['AllParcel'],
    queryFn: async () => {
      const res = await axiosInstance.get(`/bookings`);
      return res.data;
    },
  });

  const axiosInstance = useAxiosInstance();
  const { data: features = [] } = useQuery({
    queryKey: ['feature'],
    queryFn: async () => {
      const res = await axiosInstance.get(`/features`);
      return res.data;
    },
  });

  // Fetch data from your database (replace with your actual API call)
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('https://your-api.com/stats');
      const data = await response.json();
      setStats(data);
    };

    fetchData();
  }, []);

  return (
    <section className="features containe lg:ml-10 lg:mr-10 mx-auto py-12 px-4 md:px-8">
      <h2 className="text-3xl font-bold text-center mb-8">
        Our Powerful Features
      </h2>
      <div className="grid gap-8 md:grid-cols-3">
        {features.map((feature, index) => (
          <div key={index} className="rounded shadow-md p-6">
            <div className="flex justify-center items-center">
              <img
                className="text-primary  h-16  text-center w-16 "
                src={feature.icon}
                alt=""
              />
            </div>
            <h3 className="text-xl  font-bold text-center mb-2">
              {feature.title}
            </h3>
            <p className="text-gray-700 mb-4">{feature.description}</p>
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
            end={stats.parcelsDelivered}
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
            end={stats.usersRegistered}
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
