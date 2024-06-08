import React, { useState } from 'react';
import useAxiosInstance from '../../../Hooks/useAxiosInstance';
import useAuth from '../../../Hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import useGetData from '../../../Hooks/useGetData';
import Swal from 'sweetalert2';

const AllParcel = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedParcel, setSelectedParcel] = useState(null);
  const [deliveryman, setDeliveryman] = useState('');
  const [deliveryDate, setDeliveryDate] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [filteredParcels, setFilteredParcels] = useState([]);
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

  const handleAssignStatus = async id => {
    await axiosInstance.patch(`/updateDeliverBooking/${id}`, {
      status: 'On The Way',
      delivaryId: id,
      assignedDeliveryman: deliveryman,
      approximateDate: deliveryDate,
    });
  };

  const handleAssign = async () => {
    const updatedParcel = {
      ...selectedParcel,
      assignedDeliveryman: deliveryman,
      approximateDate: deliveryDate,
      image: userInfo?.image || user?.photoURL || userInfo[0]?.image,
    };
    const res = await axiosInstance.post('/assignBook', updatedParcel);
    console.log(updatedParcel);

    if (res.data.insertedId) {
      Swal.fire({
        title: 'Successful',
        showClass: {
          popup: 'animate__animated animate__fadeInUp animate__faster',
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutDown animate__faster',
        },
      });
      handleAssignStatus(selectedParcel._id);
    }
    closeModal();
  };

  const handleSearch = () => {
    const filtered = AllParcels.filter(parcel => {
      const deliveryDate = new Date(parcel.deliveryDate);
      return (
        deliveryDate >= new Date(startDate) && deliveryDate <= new Date(endDate)
      );
    });
    setFilteredParcels(filtered);
  };

  return (
    <div className="container overflow-x-auto mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">
        All Parcels <span>({AllParcels.length})</span>
      </h1>

      {/* Date Range Filter */}
      <div className="mb-4">
        <label className="block mb-2">Select Date Range</label>
        <div className="flex space-x-2">
          <input
            type="date"
            value={startDate}
            onChange={e => setStartDate(e.target.value)}
            className="p-1 border border-gray-300 rounded"
          />
          <input
            type="date"
            value={endDate}
            onChange={e => setEndDate(e.target.value)}
            className="p-1 border border-gray-300 rounded"
          />
          <button
            onClick={handleSearch}
            className="bg-orange-500 btn-sm text-white px-4 py-1 rounded"
          >
            Search
          </button>
        </div>
      </div>

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
          {(filteredParcels.length > 0 ? filteredParcels : AllParcels).map(
            (parcel, index) => (
              <tr key={index}>
                <td className="py-2 px-4 border-b">{parcel.name}</td>
                <td className="py-2 px-4 border-b">{parcel.phoneNumber}</td>
                <td className="py-2 px-4 border-b">{parcel.bookingDate}</td>
                <td className="py-2 px-4 border-b">{parcel.deliveryDate}</td>
                <td className="py-2 px-4 border-b">{parcel.price}</td>
                <td
                  className={`py-2 btn-xs px-4 border-b ${
                    parcel.status === 'pending' ||
                    parcel.status === 'On The Way'
                      ? 'bg-green-500'
                      : parcel.status === 'Delivered'
                      ? 'bg-blue-500'
                      : 'bg-gray-500 cursor-not-allowed'
                  }`}
                >
                  {parcel.status}
                </td>
                <td className="py-2 px-4 border-b">
                  {parcel?.status === 'pending' ||
                  parcel?.status === 'On The Way' ? (
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
            )
          )}
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
                        <option key={boy._id} value={boy?.email}>
                          {boy?.name}
                        </option>
                      ))}
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
