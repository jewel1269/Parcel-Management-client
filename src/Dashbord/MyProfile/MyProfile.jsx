import React from 'react';
import useGetData from '../../Hooks/useGetData';

const MyProfile = () => {
  const [userInfo] = useGetData();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 flex flex-col items-center w-full max-w-4xl">
        {/* Profile Header */}
        <div className="w-full flex flex-col md:flex-row items-center md:items-start">
          <div className="w-full md:w-1/3 flex justify-center md:justify-start mb-4 md:mb-0">
            <img
              src={
                userInfo[0]?.image ||
                userInfo?.image ||
                'https://via.placeholder.com/150'
              }
              alt="Profile"
              className="rounded-lg w-40 h-40"
            />
          </div>
          <div className="w-full md:w-2/3 flex flex-col items-center md:items-start">
            <div className="flex items-center justify-center md:justify-start py-2 rounded-md mb-4">
              <span className="text-black text-2xl ">My Profile</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">
              I'm {userInfo[0]?.name || userInfo?.name || 'Andrew Smith'}
            </h1>
            <p className="text-lg text-gray-600">
              Role: {userInfo[0]?.role || userInfo?.role}
            </p>
          </div>
        </div>

        {/* Profile Details */}
        <div className="w-full flex flex-col md:flex-row mt-8">
          <div className="w-full md:w-1/3">
            <h3 className="text-xl font-bold text-gray-800 mb-2">About Me</h3>
            <p className="text-gray-600">
              Lorem ipsum dolor sit amet, consectetur sadipscing elit, sed diam
              nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
              erat, sed diam voluptua. At vero eos et accusam et justo duo
              dolores et ea rebum.
            </p>
          </div>
          <div className="w-full md:w-2/3 mt-4 md:mt-0 md:pl-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="text-gray-800 font-bold">DESIGNATION:</h3>
                <p className="text-gray-600">{userInfo?.site}</p>
              </div>
              <div>
                <h3 className="text-gray-800 font-bold">Address</h3>
                <p className="text-gray-600">
                  {userInfo[0]?.address || userInfo?.address || ''}
                </p>
              </div>
              <div>
                <h3 className="text-gray-800 font-bold">e-mail</h3>
                <p className="text-gray-600">
                  {userInfo[0]?.email ||
                    userInfo?.email ||
                    'andrew.smith@gmail.com'}
                </p>
              </div>
              <div>
                <h3 className="text-gray-800 font-bold">Phone</h3>
                <p className="text-gray-600">
                  {userInfo[0]?.phone || userInfo?.phone || '+123 456 7890'}
                </p>
              </div>
              <div>
                <h3 className="text-gray-800 font-bold">Gender: </h3>
                <p className="text-gray-600">
                  {userInfo[0]?.freelance || userInfo?.freelance || 'Available'}
                </p>
              </div>
              <div>
                <h3 className="text-gray-800 font-bold">Birth date: </h3>
                <p className="text-gray-600">{userInfo?.gender}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Section */}
        <div className="w-full flex justify-center mt-8">
          <div className="flex space-x-6">
            <a href="#" className="text-gray-600 hover:text-gray-800">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-800">
              <i className="fab fa-facebook"></i>
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-800">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-800">
              <i className="fab fa-linkedin"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
