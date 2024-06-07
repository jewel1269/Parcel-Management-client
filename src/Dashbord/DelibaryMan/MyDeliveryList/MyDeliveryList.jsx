import React, { useState } from 'react';
import Modal from 'react-modal';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import useAxiosInstance from '../../../Hooks/useAxiosInstance';
import { useQuery } from '@tanstack/react-query';
import useGetData from '../../../Hooks/useGetData';
import Swal from 'sweetalert2';

const MyDeliveryList = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [userInfo] = useGetData();

  const axiosInstance = useAxiosInstance();

  const { refetch, data: parcels = [] } = useQuery({
    queryKey: ['parcels', userInfo?.email],
    queryFn: async () => {
      const res = await axiosInstance.get(
        `/deliverAssignBook?email=${userInfo?.email || userInfo[0]?.email}`
      );
      return res.data;
    },
    enabled: !!userInfo?.email,
  });

  const handleCancel = async index => {
    if (window.confirm('Are you sure you want to cancel this delivery?')) {
      const updatedParcels = [...parcels];
      updatedParcels[index].status = 'Cancelled';
      await axiosInstance.patch(
        `/updateDeliveredStatus/${parcels[index]._id}`,
        {
          status: 'Cancelled',
          email: userInfo?.email || userInfo[0]?.email,
        }
      );
      refetch();
    }
  };

  const handleDeliveredStatus = async id => {
    await axiosInstance.patch(`/updateDeliveredStatus/${id}`, {
      status: 'Delivered',
      email: userInfo?.email || userInfo[0]?.email,
    });
  };

  const handleDeliver = async parcel => {
    await handleDeliveredStatus(parcel._id);
    const res = await axiosInstance.patch(`/updateDeliver/${parcel.email}`, {
      status: 'Delivered',
      deliveryManEmail: userInfo?.email || userInfo[0]?.email,
    });

    if (res.data.modifiedCount > 0) {
      Swal.fire('Error', 'No updates made', 'error');
    } else {
      Swal.fire('Success', 'Parcel marked as delivered!', 'success');
    }

    refetch();
  };

  const openModal = (latitude, longitude) => {
    setSelectedLocation({ latitude, longitude });
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedLocation(null);
  };

  return (
    <div className="container overflow-x-auto mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Assigned Parcels</h1>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2">Booked User's Name</th>
            <th className="py-2">Receiver's Name</th>
            <th className="py-2">Booked User's Phone</th>
            <th className="py-2">Requested Delivery Date</th>
            <th className="py-2">Approximate Delivery Date</th>
            <th className="py-2">Receiver's Phone</th>
            <th className="py-2">Receiver's Address</th>
            <th className="py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {parcels.map((parcel, index) => (
            <tr key={index} className="text-center border-t">
              <td className="py-2">{parcel.name}</td>
              <td className="py-2">{parcel.receiverName}</td>
              <td className="py-2">{parcel.phoneNumber}</td>
              <td className="py-2">{parcel.deliveryDate}</td>
              <td className="py-2">{parcel.approximateDate}</td>
              <td className="py-2">{parcel.receiverPhoneNumber}</td>
              <td className="py-2">{parcel.deliveryAddress}</td>
              <td className="py-2 flex justify-center space-x-2">
                <button
                  className="bg-blue-500 btn-xs text-white px-3 py-1 rounded"
                  onClick={() => openModal(parcel.latitude, parcel.longitude)}
                >
                  Location
                </button>

                {parcel.status === 'Delivered' ? (
                  <button className="btn-xs text-white bg-orange-500 px-3 py-1 rounded ">
                    delete
                  </button>
                ) : (
                  <button
                    className={`btn-xs text-white px-3 py-1 rounded ${
                      parcel.status === 'Cancelled'
                        ? 'bg-gray-400'
                        : 'bg-red-500'
                    }`}
                    onClick={() => handleCancel(index)}
                    disabled={parcel.status === 'Cancelled'}
                  >
                    {parcel.status === 'Cancelled' ? 'Cancelled' : 'Cancel'}
                  </button>
                )}
                <button
                  className={`btn-xs text-white px-3 py-1 rounded ${
                    parcel.status === 'Delivered' ||
                    parcel.status === 'Cancelled'
                      ? 'bg-gray-400'
                      : 'bg-green-500'
                  }`}
                  onClick={() => handleDeliver(parcel)}
                  disabled={parcel.status === 'Delivered'}
                >
                  {parcel.status === 'Delivered' ? 'Delivered' : 'Deliver'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Location Modal"
        className="fixed inset-0 flex items-center justify-center p-4"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50"
      >
        {selectedLocation && (
          <MapContainer
            center={[selectedLocation.latitude, selectedLocation.longitude]}
            zoom={13}
            scrollWheelZoom={false}
            style={{ width: '600px', height: '400px' }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker
              position={[selectedLocation.latitude, selectedLocation.longitude]}
            >
              <Popup>Parcel Location</Popup>
            </Marker>
          </MapContainer>
        )}
        <button
          className="absolute top-4 right-4 bg-white px-4 py-2 rounded"
          onClick={closeModal}
        >
          Close
        </button>
      </Modal>
    </div>
  );
};

export default MyDeliveryList;
