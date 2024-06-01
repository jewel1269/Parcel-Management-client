import React from 'react';
import useGetData from '../../Hooks/useGetData';

const MyProfile = () => {
  const [userInfo] = useGetData();
  return (
    <div className="flex flex-col h-full lg:w-[1000px] lg:ml-16 lg:mt-20 md:flex-row items-center md:items-start md:space-x-8 p-4">
      {/* Left Section */}
      <div className="border rounded-lg p-4 w-full bg-white shadow">
        <div className="flex flex-col items-center">
          <img
            src={userInfo[0]?.image} // Placeholder image
            alt="Profile"
            className="rounded-full w-24 h-24 mb-4"
          />
          <div className="flex flex-col w-full">
            <label className="font-bold">NAME:</label>
            <input
              type="text"
              value={userInfo[0]?.name}
              className="border rounded p-1 mb-2"
            />
            <label className="font-bold">DESIGNATION:</label>
            <input
              type="text"
              value={userInfo[0]?.site}
              className="border rounded p-1 mb-4"
            />
            <button className="bg-blue-500 text-white rounded p-2">SAVE</button>
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="w-full py-3 bg-white shadow p-4 rounded-lg">
        <h2 className="text-xl font-semibold">{userInfo[0]?.name}</h2>
        <p className="text-sm text-gray-500">TN, India</p>
        <p className="text-blue-500 underline">{userInfo[0]?.site}</p>
        <div className="flex items-center mt-2">
          <span className="text-yellow-500">★★★★☆</span>
        </div>
        <div className="mt-4">
          <ul className="flex space-x-4 border-b pb-2">
            <li className="font-bold text-blue-500 cursor-pointer">ABOUT</li>
            <li className="cursor-pointer">TIMELINE</li>
          </ul>
          <div className="mt-4">
            <div>
              <h3 className="font-semibold">CONTACT INFORMATION</h3>
              <p>
                <span className="font-bold">Address:</span>{' '}
                {userInfo[0]?.address}
              </p>
              <p>
                <span className="font-bold">Phone:</span> {userInfo[0]?.phone}
              </p>
              <p>
                <span className="font-bold">Email:</span>{' '}
                <span className="text-red-500">{userInfo[0]?.email}</span>
              </p>
              <p>
                <span className="font-bold">Site:</span> {userInfo[0]?.site}
              </p>
            </div>
            <div className="mt-4">
              <h3 className="font-semibold">BASIC INFORMATION</h3>
              <p>
                <span className="font-bold">Birthday:</span>{' '}
                {userInfo[0]?.birthday}
              </p>
              <p>
                <span className="font-bold">Gender:</span> {userInfo[0]?.gender}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
