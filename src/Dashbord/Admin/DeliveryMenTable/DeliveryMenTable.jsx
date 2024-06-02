import React from 'react';
import useAxiosInstance from '../../../Hooks/useAxiosInstance';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../Hooks/useAuth';
import useGetData from '../../../Hooks/useGetData';

// Mock data for delivery men

const DeliveryMenTable = () => {
  const axiosInstance = useAxiosInstance();

  const { data: deliveryMen } = useQuery({
    queryKey: ['deliveryMen'],
    queryFn: async () => {
      const res = await axiosInstance.get('/Delivar?role=delivaryMan');
      return res.data;
    },
  });

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Delivery Men</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 border-b text-left">
                Delivery Man's Name
              </th>
              <th className="py-2 px-4 border-b text-left">Phone Number</th>
              <th className="py-2 px-4 border-b text-left">
                Number of Parcels Delivered
              </th>
              <th className="py-2 px-4 border-b text-left">Average Review</th>
            </tr>
          </thead>
          <tbody>
            {deliveryMen &&
              deliveryMen.map((man, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="py-2 px-4 border-b">{man.name}</td>
                  <td className="py-2 px-4 border-b">{man.phone}</td>
                  <td className="py-2 px-4 border-b">{man.parcelsDelivered}</td>
                  <td className="py-2 px-4 border-b">{man.averageReview}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DeliveryMenTable;
