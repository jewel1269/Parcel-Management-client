import React, { useState } from 'react';
import Modal from 'react-modal';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

// Sample data
const parcels = [
  {
    bookedUserName: 'John Doe',
    receiverName: 'Jane Smith',
    bookedUserPhone: '123-456-7890',
    requestedDeliveryDate: '2023-06-01',
    approximateDeliveryDate: '2023-06-05',
    receiverPhoneNumber: '098-765-4321',
    receiverAddress: '123 Elm Street',
    latitude: 37.7749,
    longitude: -122.4194,
  },
  // Add more parcels as needed
];

const MyDeliveryList = () => {
  const [parcelData, setParcelData] = useState(parcels);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);

  const handleCancel = index => {
    if (window.confirm('Are you sure you want to cancel this delivery?')) {
      const updatedParcels = [...parcelData];
      updatedParcels[index].status = 'Cancelled';
      setParcelData(updatedParcels);
    }
  };

  const handleDeliver = index => {
    if (window.confirm('Are you sure you want to mark this as delivered?')) {
      const updatedParcels = [...parcelData];
      updatedParcels[index].status = 'Delivered';
      setParcelData(updatedParcels);
    }
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
    <div className="container mx-auto p-4">
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
          {parcelData.map((parcel, index) => (
            <tr key={index} className="text-center border-t">
              <td className="py-2">{parcel.bookedUserName}</td>
              <td className="py-2">{parcel.receiverName}</td>
              <td className="py-2">{parcel.bookedUserPhone}</td>
              <td className="py-2">{parcel.requestedDeliveryDate}</td>
              <td className="py-2">{parcel.approximateDeliveryDate}</td>
              <td className="py-2">{parcel.receiverPhoneNumber}</td>
              <td className="py-2">{parcel.receiverAddress}</td>
              <td className="py-2 flex justify-center space-x-2">
                <button
                  className="bg-blue-500 btn-xs text-white px-3 py-1 rounded"
                  onClick={() => openModal(parcel.latitude, parcel.longitude)}
                >
                  View Location
                </button>
                <button
                  className="bg-red-500 btn-xs text-white px-3 py-1 rounded"
                  onClick={() => handleCancel(index)}
                >
                  Cancel
                </button>
                <button
                  className="bg-green-500 btn-xs text-white px-3 py-1 rounded"
                  onClick={() => handleDeliver(index)}
                >
                  Deliver
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
            style={{ width: '100%', height: '1000px' }}
          >
            <TileLayer
              className="w-[1200px]"
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
