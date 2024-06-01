import React, { useState, useEffect } from 'react';
import { FaStar } from 'react-icons/fa';

const DeliveryMen = () => {
  const [deliveryMen, setDeliveryMen] = useState([]);

  useEffect(() => {
    // Simulate fetching data from the database
    const fetchData = async () => {
      // Replace this with your actual data fetching logic
      const data = await new Promise(resolve => {
        setTimeout(() => {
          resolve([
            {
              name: 'John Doe',
              image: '../../../assets/DeliveryMen/john_doe.png',
              parcelsDelivered: 120,
              averageRating: 4.5,
            },
            {
              name: 'Jane Smith',
              image: '../../../assets/DeliveryMen/jane_smith.png',
              parcelsDelivered: 110,
              averageRating: 4.7,
            },
            {
              name: 'Sam Wilson',
              image: '../../../assets/DeliveryMen/sam_wilson.png',
              parcelsDelivered: 100,
              averageRating: 4.6,
            },
          ]);
        }, 1000);
      });

      setDeliveryMen(data);
    };

    fetchData();
  }, []);

  return (
    <div className="container mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-center mb-8">Top Delivery Men</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {deliveryMen.map((man, index) => (
          <div
            key={index}
            className="p-6 border rounded-lg shadow-md text-center"
          >
            <img
              src={man.image}
              alt={man.name}
              className="mx-auto mb-4 rounded-full w-24 h-24 object-cover"
            />
            <h3 className="text-xl font-semibold mb-2">{man.name}</h3>
            <p className="text-gray-600 mb-2">
              Parcels Delivered: {man.parcelsDelivered}
            </p>
            <div className="flex justify-center items-center">
              <FaStar className="text-yellow-500" />
              <p className="text-gray-600 ml-2">{man.averageRating}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DeliveryMen;
