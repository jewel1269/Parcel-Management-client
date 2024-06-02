import React, { useState } from 'react';
import useAxiosInstance from '../../../Hooks/useAxiosInstance';
import useAuth from '../../../Hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import useGetData from '../../../Hooks/useGetData';
// import '../AllParcel/AllParcel.css';

const AllParcel = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedParcel, setSelectedParcel] = useState(null);
  const [deliveryman, setDeliveryman] = useState('');
  const [deliveryDate, setDeliveryDate] = useState('');
  const [userInfo] = useGetData();

  const axiosInstance = useAxiosInstance();
  const { user } = useAuth();

  const { data: deliveryMen } = useQuery({
    queryKey: ['deliveryMen'],
    queryFn: async () => {
      const res = await axiosInstance.get('/Delivar?role=delivaryMan');
      return res.data;
    },
  });

  const { refetch, data: AllParcels = [] } = useQuery({
    queryKey: ['AllParcel'],
    queryFn: async () => {
      const res = await axiosInstance.get(`/bookings`);
      return res.data;
    },
  });

  const openModal = parcel => {
    setSelectedParcel(parcel);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedParcel(null);
    setDeliveryman('');
    setDeliveryDate('');
  };

  const handleAssign = () => {
    // Implement the logic to change the status to 'On The Way' and add the deliveryman ID here
    console.log('Assigning deliveryman:', deliveryman);
    console.log('Approximate delivery date:', deliveryDate);
    closeModal();
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">All Parcels</h1>
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">User's Name</th>
            <th className="py-2 px-4 border-b">User's Phone</th>
            <th className="py-2 px-4 border-b">Booking Date</th>
            <th className="py-2 px-4 border-b">Req. Delivery Date</th>
            <th className="py-2 px-4 border-b">Cost</th>
            <th className="py-2 px-4 border-b">Status</th>
            <th className="py-2 px-4 border-b">Manage</th>
          </tr>
        </thead>
        <tbody>
          {AllParcels.map((parcel, index) => (
            <tr key={index}>
              <td className="py-2 px-4 border-b">{parcel.name}</td>
              <td className="py-2 px-4 border-b">{parcel.phoneNumber}</td>
              <td className="py-2 px-4 border-b">{parcel.bookingDate}</td>
              <td className="py-2 px-4 border-b">{parcel.deliveryDate}</td>
              <td className="py-2 px-4 border-b">{parcel.price}</td>
              <td
                className={`py-2 btn-xs px-4 border-b ${
                  parcel.status === 'pending'
                    ? 'bg-green-500 '
                    : 'bg-gray-500 cursor-not-allowed'
                }`}
              >
                {parcel.status}
              </td>
              <td className="py-2 px-4 border-b">
                {parcel?.status === 'pending' ? (
                  <button
                    className="bg-orange-400 btn-xs text-white px-4 rounded"
                    onClick={() => openModal(parcel)}
                  >
                    Manage
                  </button>
                ) : (
                  <button
                    className="bg-gray-400 btn-xs text-white px-4 rounded cursor-not-allowed"
                    disabled
                  >
                    Not Available
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center">
          <div className="bg-gray-50 p-8 lg:w-96 rounded shadow-lg">
            <h2 className="text-xl font-bold mb-4">Manage Parcel</h2>
            {selectedParcel && (
              <>
                <div className="mb-4">
                  <label className="block mb-2">Deliveryman</label>
                  <select
                    value={deliveryman}
                    onChange={e => setDeliveryman(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded"
                  >
                    <option value="">Select Deliveryman</option>
                    {deliveryMen &&
                      deliveryMen.map(boy => (
                        <option key={boy._id} value="1">
                          {' '}
                          {boy?.name}
                        </option>
                      ))}

                    {/* Add more deliverymen options as needed */}
                  </select>
                </div>
                <div className="mb-4">
                  <label className="block mb-2">
                    Approximate Delivery Date
                  </label>
                  <input
                    type="date"
                    value={deliveryDate}
                    onChange={e => setDeliveryDate(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>
                <button
                  className="bg-orange-400 text-white px-4 py-2 rounded mr-2"
                  onClick={handleAssign}
                >
                  Assign
                </button>
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded"
                  onClick={closeModal}
                >
                  Cancel
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AllParcel;
