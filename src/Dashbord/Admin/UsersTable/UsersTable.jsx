import React, { useState } from 'react';
import useAxiosInstance from '../../../Hooks/useAxiosInstance';
import useAuth from '../../../Hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import { Helmet } from 'react-helmet-async';

// Function to generate a random number within a specified range
const getRandomNumber = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const UsersTable = () => {
  const { user } = useAuth();
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;
  const axiosInstance = useAxiosInstance();
  const { refetch, data: users = [] } = useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      const res = await axiosInstance.get(`/users`);
      return res.data;
    },
  });

  // Add random data to users
  const processedUsers = users.map(user => ({
    ...user,
    parcelsBooked: user.parcelsBooked ?? getRandomNumber(1, 60),
    totalSpent: user.totalSpent ?? getRandomNumber(50, 1000),
  }));

  // Logic for displaying users
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = processedUsers.slice(indexOfFirstUser, indexOfLastUser);

  // Change page
  const paginate = pageNumber => setCurrentPage(pageNumber);

  const handleMakeDeliveryMan = user => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will make this user a delivery man!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, make delivery man!',
    }).then(result => {
      if (result.isConfirmed) {
        axiosInstance
          .patch(`/updateRole/${user._id}`, { role: 'deliveryMan' })
          .then(response => {
            Swal.fire({
              title: 'Successful!',
              text: `${user.name} is now a delivery man.`,
              icon: 'success',
            });
            refetch();
          })
          .catch(error => {
            Swal.fire({
              title: 'Error!',
              text: 'Failed to update the role. Please try again later.',
              icon: 'error',
            });
          });
      }
    });
  };

  const handleMakeAdmin = user => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will make this user an admin!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, make admin!',
    }).then(result => {
      if (result.isConfirmed) {
        axiosInstance
          .patch(`/updateRole/${user._id}`, { role: 'admin' })
          .then(response => {
            Swal.fire({
              title: 'Successful!',
              text: `${user.name} is now an admin.`,
              icon: 'success',
            });
            refetch();
          })
          .catch(error => {
            Swal.fire({
              title: 'Error!',
              text: 'Failed to update the role. Please try again later.',
              icon: 'error',
            });
          });
      }
    });
  };

  return (
    <div className="container mx-auto p-4">
      <Helmet>
        <title>Parcel Patah | All UsMyers</title>
      </Helmet>
      <h1 className="text-2xl font-bold mb-4">
        All Users <span>({users.length})</span>
      </h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 border-b text-left">User's Name</th>
              <th className="py-2 px-4 border-b text-left">Phone Number</th>
              <th className="py-2 px-4 border-b text-left">
                Number of Parcels Booked
              </th>
              <th className="py-2 px-4 border-b text-left">
                Total Spent Amount
              </th>
              <th className="py-2 px-4 border-b text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.map((user, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="py-2 px-4 border-b">{user.name}</td>
                <td className="py-2 px-4 border-b">{user.phone}</td>
                <td className="py-2 px-4 border-b">{user.parcelsBooked}</td>
                <td className="py-2 px-4 border-b">{user.totalSpent} Taka</td>
                <td className="py-2 px-4 border-b">
                  {user?.role !== 'deliveryMan' && (
                    <button
                      className="bg-green-500 lg:btn-sm md:btn-sm btn-xs text-white px-4 rounded mr-2"
                      onClick={() => handleMakeDeliveryMan(user)}
                    >
                      Make Delivery Man
                    </button>
                  )}

                  {user?.role !== 'admin' && (
                    <button
                      className="bg-blue-500 lg:btn-sm md:btn-sm btn-xs text-white px-4 rounded"
                      onClick={() => handleMakeAdmin(user)}
                    >
                      Make Admin
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center mt-4">
        <nav>
          <h1 className="text-gray-300">pagination</h1>
          <ul className="flex pl-0 list-none rounded my-2">
            {Array.from(
              { length: Math.ceil(users.length / usersPerPage) },
              (_, index) => (
                <li key={index} className="mx-1">
                  <button
                    onClick={() => paginate(index + 1)}
                    className={`px-3 py-1 rounded ${
                      currentPage === index + 1
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-200'
                    }`}
                  >
                    {index + 1}
                  </button>
                </li>
              )
            )}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default UsersTable;
