import React from 'react';

import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000',
  headers: {
    'Content-Type': 'application/json',
  },
});

const useAxiosInstance = () => {
  return axiosInstance;
};

export default useAxiosInstance;
