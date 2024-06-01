import React from 'react';

// Mock data for delivery men
const deliveryMen = [
  {
    name: 'John Doe',
    phone: '123-456-7890',
    parcelsDelivered: 150,
    averageReview: 4.5,
  },
  {
    name: 'Jane Smith',
    phone: '098-765-4321',
    parcelsDelivered: 200,
    averageReview: 4.8,
  },
  {
    name: 'Michael Johnson',
    phone: '555-555-5555',
    parcelsDelivered: 175,
    averageReview: 4.6,
  },
  {
    name: 'Emily Davis',
    phone: '444-444-4444',
    parcelsDelivered: 180,
    averageReview: 4.7,
  },
  // Add more delivery men as needed
];

const DeliveryMenTable = () => {
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
            {deliveryMen.map((man, index) => (
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
