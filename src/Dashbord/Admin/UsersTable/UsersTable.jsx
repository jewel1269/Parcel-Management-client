import React, { useState } from 'react';

// Mock data for users
const users = [
  {
    name: 'John Doe',
    phone: '123-456-7890',
    parcelsBooked: 10,
    totalSpent: 1000,
  },
  {
    name: 'Jane Smith',
    phone: '098-765-4321',
    parcelsBooked: 15,
    totalSpent: 1500,
  },
  {
    name: 'Michael Johnson',
    phone: '555-555-5555',
    parcelsBooked: 7,
    totalSpent: 700,
  },
  {
    name: 'Emily Davis',
    phone: '444-444-4444',
    parcelsBooked: 12,
    totalSpent: 1200,
  },
  {
    name: 'David Brown',
    phone: '333-333-3333',
    parcelsBooked: 20,
    totalSpent: 2000,
  },
  {
    name: 'Alice Johnson',
    phone: '222-222-2222',
    parcelsBooked: 8,
    totalSpent: 800,
  },
  {
    name: 'Chris Lee',
    phone: '111-111-1111',
    parcelsBooked: 5,
    totalSpent: 500,
  },
  // Add more users as needed
];

const UsersTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;

  // Logic for displaying users
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  // Change page
  const paginate = pageNumber => setCurrentPage(pageNumber);

  const handleMakeDeliveryMan = userName => {
    console.log(`Changing ${userName} to Delivery Man`);
    // Implement the logic to change user type to Delivery Man
  };

  const handleMakeAdmin = userName => {
    console.log(`Changing ${userName} to Admin`);
    // Implement the logic to change user type to Admin
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">All Users</h1>
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
                <td className="py-2 px-4 border-b">{user.totalSpent} USD</td>
                <td className="py-2 px-4 border-b">
                  <button
                    className="bg-green-500 text-white px-4 py-2 rounded mr-2"
                    onClick={() => handleMakeDeliveryMan(user.name)}
                  >
                    Make Delivery Man
                  </button>
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                    onClick={() => handleMakeAdmin(user.name)}
                  >
                    Make Admin
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center mt-4">
        <nav>
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
