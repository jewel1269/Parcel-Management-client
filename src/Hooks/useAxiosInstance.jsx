import React from 'react';

import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://parcel-system-manageent-server.vercel.app',
  headers: {
    'Content-Type': 'application/json',
  },
});

const useAxiosInstance = () => {
  return axiosInstance;
};

export default useAxiosInstance;
