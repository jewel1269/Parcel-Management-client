import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { useLoaderData, useNavigate } from 'react-router-dom';
import useGetData from '../../../../Hooks/useGetData';
import useAxiosInstance from '../../../../Hooks/useAxiosInstance';
import useAuth from '../../../../Hooks/useAuth';

const UpdateBooking = () => {
  const [userInfo] = useGetData();
  const navigate = useNavigate();
  const { user } = useAuth();
  const axiosInstance = useAxiosInstance();
  const item = useLoaderData();

  const [formData, setFormData] = useState({
    name: user?.name || user?.displayName,
    email: user?.email,
    phoneNumber: item?.phoneNumber || '',
    parcelType: item?.parcelType || '',
    parcelWeight: item?.parcelWeight || '',
    receiverName: item?.receiverName || '',
    receiverPhoneNumber: item?.receiverPhoneNumber || '',
    deliveryAddress: item?.deliveryAddress || '',
    deliveryDate: item?.deliveryDate || '',
    latitude: item?.latitude || '',
    longitude: item?.longitude || '',
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  console.log(formData);

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const response = await axiosInstance.patch(
        `/updateBooking/${item._id}`,
        formData
      );
      console.log(response.data);
      Swal.fire('Success', 'Booking updated successfully', 'success');
      navigate('/Dashboard/MyParcels');
    } catch (error) {
      console.error(error); // Log any error for debugging
      Swal.fire('Error', 'Failed to update booking', 'error');
    }
  };

  return (
    <div className="w-full mt-10 p-8 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold text-center mb-6">Update Booking</h1>
      <form
        onSubmit={handleSubmit}
        className="lg:grid md:grid lg:ml-16 lg:mr-16 md:grid-cols-2 lg:grid-cols-2 gap-6"
      >
        <div>
          <label className="block text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            readOnly
            className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
          />
        </div>
        <div>
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            readOnly
            className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
          />
        </div>
        <div>
          <label className="block text-gray-700">Phone Number</label>
          <input
            type="tel"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Parcel Type</label>
          <input
            type="text"
            name="parcelType"
            value={formData.parcelType}
            onChange={handleChange}
            className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Parcel Weight</label>
          <input
            type="number"
            name="parcelWeight"
            value={formData.parcelWeight}
            onChange={handleChange}
            className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Receiver’s Name</label>
          <input
            type="text"
            name="receiverName"
            value={formData.receiverName}
            onChange={handleChange}
            className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Receiver's Phone Number</label>
          <input
            type="tel"
            name="receiverPhoneNumber"
            value={formData.receiverPhoneNumber}
            onChange={handleChange}
            className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Parcel Delivery Address</label>
          <input
            type="text"
            name="deliveryAddress"
            value={formData.deliveryAddress}
            onChange={handleChange}
            className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Requested Delivery Date</label>
          <input
            type="date"
            name="deliveryDate"
            value={formData.deliveryDate}
            onChange={handleChange}
            className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">
            Delivery Address Latitude
          </label>
          <input
            type="number"
            step="any"
            name="latitude"
            value={formData.latitude}
            onChange={handleChange}
            className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">
            Delivery Address Longitude
          </label>
          <input
            type="number"
            step="any"
            name="longitude"
            value={formData.longitude}
            onChange={handleChange}
            className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Price (Tk)</label>
          <input
            type="number"
            name="price"
            value={item?.price}
            readOnly
            className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
          />
        </div>
        <div className="col-span-2">
          <button
            type="submit"
            className="w-full py-2 mt-4 text-white bg-orange-400 rounded-lg hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600"
          >
            Update Booking
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateBooking;
