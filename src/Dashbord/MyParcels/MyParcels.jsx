import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

const MyParcels = () => {
  const [parcels, setParcels] = useState([
    {
      id: 1,
      type: 'Document',
      requestedDeliveryDate: '2023-06-15',
      approximateDeliveryDate: '2023-06-20',
      bookingDate: new Date().toLocaleDateString(),
      deliveryMenId: null,
      status: 'pending',
    },
    {
      id: 2,
      type: 'Package',
      requestedDeliveryDate: '2023-06-10',
      approximateDeliveryDate: '2023-06-15',
      bookingDate: new Date().toLocaleDateString(),
      deliveryMenId: 123,
      status: 'delivered',
    },
  ]);

  const handleUpdate = id => {
    // Redirect to update page logic
    console.log(`Update parcel with ID: ${id}`);
  };

  const handleCancel = id => {
    const confirmCancel = window.confirm(
      'Are you sure you want to cancel this booking?'
    );
    if (confirmCancel) {
      setParcels(
        parcels.map(parcel =>
          parcel.id === id ? { ...parcel, status: 'cancelled' } : parcel
        )
      );
    }
  };

  const handleReview = id => {
    // Logic to handle review
    console.log(`Review parcel with ID: ${id}`);
  };

  const handlePay = id => {
    // Logic to handle payment
    console.log(`Pay for parcel with ID: ${id}`);
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">My Parcels</h2>
      <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow">
        <thead>
          <tr className="w-full bg-gray-200">
            <th className="py-2 px-4 border-b">Parcel Type</th>
            <th className="py-2 px-4 border-b">Req. Delivery Date</th>
            <th className="py-2 px-4 border-b">Appro. Delivery Date</th>
            <th className="py-2 px-4 border-b">Booking Date</th>
            <th className="py-2 px-4 border-b">Delivery Men ID</th>
            <th className="py-2 px-4 border-b">Status</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {parcels.map(parcel => (
            <tr key={parcel.id} className="hover:bg-gray-100">
              <td className="py-2 px-4 border-b">{parcel.type}</td>
              <td className="py-2 px-4 border-b">
                {parcel.requestedDeliveryDate}
              </td>
              <td className="py-2 px-4 border-b">
                {parcel.approximateDeliveryDate}
              </td>
              <td className="py-2 px-4 border-b">{parcel.bookingDate}</td>
              <td className="py-2 px-4 border-b">
                {parcel.deliveryMenId || 'N/A'}
              </td>
              <td className="py-2 px-4 border-b capitalize">{parcel.status}</td>
              <td className="py-2 px-4 border-b space-x-2">
                <button
                  onClick={() => handleUpdate(parcel.id)}
                  className={`px-4 btn-xs text-white rounded ${
                    parcel.status === 'pending'
                      ? 'bg-blue-500 hover:bg-blue-700'
                      : 'bg-gray-500 cursor-not-allowed'
                  }`}
                  disabled={parcel.status !== 'pending'}
                >
                  Update
                </button>
                <button
                  onClick={() => handleCancel(parcel.id)}
                  className={`px-4 btn-xs text-white rounded ${
                    parcel.status === 'pending'
                      ? 'bg-red-500 hover:bg-red-700'
                      : 'bg-gray-500 cursor-not-allowed'
                  }`}
                  disabled={parcel.status !== 'pending'}
                >
                  Cancel
                </button>
                {parcel.status === 'delivered' && (
                  <button
                    onClick={() => handleReview(parcel.id)}
                    className="px-4 btn-xs bg-green-500 text-white rounded hover:bg-green-700"
                  >
                    Review
                  </button>
                )}
                <NavLink to={'/Dashboard/Payment'}>
                  <button
                    onClick={() => handlePay(parcel.id)}
                    className="px-4 btn-xs bg-yellow-500 text-white rounded hover:bg-yellow-700"
                  >
                    Pay
                  </button>
                </NavLink>

                {/* <button
                  onClick={() => handlePay(parcel.id)}
                  className="px-4 btn-xs bg-yellow-500 text-white rounded hover:bg-yellow-700"
                >
                  Pay
                </button> */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyParcels;
