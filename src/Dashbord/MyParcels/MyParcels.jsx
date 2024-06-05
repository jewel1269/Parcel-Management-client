import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import useAxiosInstance from '../../Hooks/useAxiosInstance';
import useAuth from '../../Hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import ReviewModal from './ReviewModal'; // Import the ReviewModal component

const MyParcels = () => {
  const axiosInstance = useAxiosInstance();
  const { user } = useAuth();

  const { refetch, data: parcels = [] } = useQuery({
    queryKey: ['parcel', user?.email],
    queryFn: async () => {
      const email = user?.email;
      const res = await axiosInstance.get(`/Spacificbookings?email=${email}`);
      return res.data;
    },
  });

  const [showReviewModal, setShowReviewModal] = useState(false);
  const [selectedDeliveryMenId, setSelectedDeliveryMenId] = useState(null);

  const handleCancel = parcel => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, cancel it!',
    }).then(result => {
      if (result.isConfirmed) {
        axiosInstance
          .patch(`/updateStatus/${parcel._id}`, { status: 'cancelled' })
          .then(response => {
            Swal.fire({
              title: 'Cancelled!',
              text: 'Your parcel has been cancelled.',
              icon: 'success',
            });
            refetch(); // Refetch parcels after cancellation
          })
          .catch(error => {
            console.error('Error cancelling parcel:', error);
            Swal.fire({
              title: 'Error!',
              text: 'Failed to cancel the parcel. Please try again later.',
              icon: 'error',
            });
          });
      }
    });
  };

  const handleReview = deliveryMenId => {
    setSelectedDeliveryMenId(deliveryMenId);
    setShowReviewModal(true);
  };

  const handleSubmitReview = async review => {
    try {
      await axiosInstance.post('/reviews', {
        ...review,
        userName: user.name,
        userImage: user.image,
        userId: user._id,
      });
      Swal.fire({
        title: 'Success!',
        text: 'Your review has been submitted.',
        icon: 'success',
      });
      // You can add additional logic here, such as updating the UI or refetching data
    } catch (error) {
      console.error('Error submitting review:', error);
      Swal.fire({
        title: 'Error!',
        text: 'Failed to submit the review. Please try again later.',
        icon: 'error',
      });
    }
  };

  const handlePay = id => {
    console.log(`Pay for parcel with ID: ${id}`);
  };

  return (
    <div className="container overflow-x-auto mx-auto p-4">
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
            <tr key={parcel._id} className="hover:bg-gray-100">
              <td className="py-2 px-4 border-b">{parcel.parcelType}</td>
              <td className="py-2 px-4 border-b">{parcel.deliveryDate}</td>
              <td className="py-2 px-4 border-b">
                {parcel.approximateDeliveryDate}
              </td>
              <td className="py-2 px-4 border-b">{parcel.bookingDate}</td>
              <td className="py-2 px-4 border-b">
                {parcel.deliveryMenId || 'N/A'}
              </td>
              <td className="py-2 px-4 border-b capitalize">{parcel.status}</td>
              <td className="py-2 px-4 border-b space-x-2">
                <NavLink to={`/Dashboard/UpdateBooking/${parcel._id}`}>
                  <button
                    className={`px-4 btn-xs text-white rounded ${
                      parcel.status === 'pending'
                        ? 'bg-blue-500 hover:bg-blue-700'
                        : 'bg-gray-500 cursor-not-allowed'
                    }`}
                    disabled={parcel.status !== 'pending'}
                  >
                    Update
                  </button>
                </NavLink>
                {parcel.status === 'Delivered' ? (
                  <button
                    onClick={() => handleReview(parcel.deliveryMenId)}
                    className="px-4 btn-xs bg-green-500 text-white rounded hover:bg-green-700"
                  >
                    Review
                  </button>
                ) : (
                  <button
                    onClick={() => handleCancel(parcel)}
                    className={`px-4 btn-xs text-white rounded ${
                      parcel.status === 'pending'
                        ? 'bg-red-500 hover:bg-red-700'
                        : 'bg-gray-500 cursor-not-allowed'
                    }`}
                    disabled={parcel.status !== 'pending'}
                  >
                    Cancel
                  </button>
                )}
                <NavLink to={'/Dashboard/Payment'}>
                  <button
                    onClick={() => handlePay(parcel._id)}
                    className="px-4 btn-xs bg-yellow-500 text-white rounded hover:bg-yellow-700"
                  >
                    Pay
                  </button>
                </NavLink>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyParcels;
