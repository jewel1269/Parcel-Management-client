import React, { useEffect, useState } from 'react';
import useGetData from '../../Hooks/useGetData';
import { DiVim } from 'react-icons/di';
import useAxiosInstance from '../../Hooks/useAxiosInstance';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../Hooks/useAuth';

const BookParcel = () => {
  const [userInfo] = useGetData();
  const navigate = useNavigate();
  const { user } = useAuth();
  console.log(user);
  const axiosInstance = useAxiosInstance();
  const [formData, setFormData] = useState({
    name: userInfo?.name || user?.displayName || userInfo[0]?.name,
    email: user?.email,
    phoneNumber: '',
    status: 'pending',
    bookingDate: new Date(),
    parcelType: '',
    parcelWeight: '',
    receiverName: '',
    receiverPhoneNumber: '',
    deliveryAddress: '',
    deliveryDate: '',
    latitude: '',
    longitude: '',
    price: '',
  });
  console.log(userInfo);

  const handleChange = e => {
    const { name, value } = e.target;
    let updatedFormData = { ...formData, [name]: value };

    if (name === 'parcelWeight') {
      const weight = parseFloat(value);
      if (weight <= 1) {
        updatedFormData.price = 50;
      } else if (weight <= 2) {
        updatedFormData.price = 100;
      } else {
        updatedFormData.price = 150;
      }
    }

    setFormData(updatedFormData);
  };

  const handleSubmit = e => {
    e.preventDefault();
    axiosInstance.post('/bookings', formData).then(res => {
      console.log(res.data);
      if (res.data.insertedId) {
        Swal.fire({
          title: 'Booking Complete Successfully',
          showClass: {
            popup: `
      animate__animated
      animate__fadeInUp
      animate__faster
    `,
          },
          hideClass: {
            popup: `
      animate__animated
      animate__fadeOutDown
      animate__faster
      `,
          },
        });
        navigate('/Dashboard/Myparcels');
        from.reset();
      }
    });
  };

  return (
    <div className="w-full  mt-10 p-8 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold text-center mb-6">Book a Parcel</h1>
      <form
        onSubmit={handleSubmit}
        className="lg:grid md:grid lg:ml-16 lg:mr-16 md:grid-cols-2 lg:grid-cols-2 gap-6"
      >
        <div>
          <label className="block text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={formData?.name}
            readOnly
            className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
          />
        </div>
        <div>
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={formData?.email}
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
            value={formData.price}
            readOnly
            className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
          />
        </div>
        <div className="col-span-2">
          <button
            type="submit"
            className="w-full py-2 mt-4 text-white bg-orange-400 rounded-lg hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600"
          >
            Book
          </button>
        </div>
      </form>
    </div>
  );
};

export default BookParcel;
