import React, { useState } from 'react';
import {
  useMutation,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  FaGoogle,
  FaFacebook,
  FaGithub,
  FaEyeSlash,
  FaEye,
} from 'react-icons/fa';
import logo from '../../assets/5243321-removebg-preview.png';
import useAuth from '../../Hooks/useAuth';
import useAxiosInstance from '../../Hooks/useAxiosInstance';
import { toast } from 'react-toastify';

const imageHostingKey = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const imageHostingApi = `https://api.imgbb.com/1/upload?key=${imageHostingKey}`;
const SignIn = () => {
  const { createUser } = useAuth();
  const navigate = useNavigate();
  const axiosInstance = useAxiosInstance();
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const address = form.address.value;
    const email = form.email.value;
    const phone = form.phone.value;
    const password = form.password.value;
    const birthday = form.birthday.value;
    const role = form.role.value;
    const gender = form.gender.value;
    const site = form.site.value;
    const image = form.image.files[0];

    const formData = new FormData();
    formData.append('image', image);
    try {
      const imageResponse = await fetch(imageHostingApi, {
        method: 'POST',
        body: formData,
      });
      const imageResult = await imageResponse.json();
      const imageUrl = imageResult.data.url;

      const userInfo = {
        name,
        address,
        email,
        phone,
        birthday,
        gender,
        site,
        image: imageUrl,
        role,
      };

      await createUser(email, password);
      const res = await axiosInstance.post('/users', userInfo);
      console.log(res.data);
      if (res.data.insertedId) {
        toast.success('Registation Complete');
        navigate('/');
      }
    } catch (error) {
      console.error('Error during user creation or form submission:', error);
      alert('There was an error processing your request.');
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl w-full bg-white shadow-lg rounded-lg p-8 space-y-8 md:flex md:space-y-0 md:space-x-8">
        <div className=" md:block w-1/2">
          <img
            src={logo} // Replace with your image path
            alt="Login Illustration"
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
        <div className="w-full md:w-1/2">
          <h2 className="text-center text-3xl font-extrabold text-gray-900">
            SignIn to your account
          </h2>
          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="name" className="sr-only">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Name"
                  required
                />
              </div>
              <div>
                <label htmlFor="address" className="sr-only">
                  Address
                </label>
                <input
                  id="address"
                  name="address"
                  type="text"
                  className="appearance-none mt-2 rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Address"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="sr-only">
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  className="appearance-none mt-2 rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Email address"
                  required
                />
              </div>
              <div className="relative">
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  className="appearance-none mt-2 rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                  required
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <button
                    type="button"
                    onClick={toggleShowPassword}
                    className="focus:outline-none"
                  >
                    {showPassword ? (
                      <FaEyeSlash className="h-5 w-5 text-gray-500" />
                    ) : (
                      <FaEye className="h-5 w-5 text-gray-500" />
                    )}
                  </button>
                </div>
              </div>
              <div>
                <label htmlFor="phone" className="sr-only">
                  Phone
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  className="appearance-none mt-2 rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Phone"
                  required
                />
              </div>

              <div>
                <label htmlFor="birthday" className="sr-only">
                  Birthday
                </label>
                <input
                  id="birthday"
                  name="birthday"
                  type="date"
                  placeholder="Birthday"
                  className="appearance-none mt-2 rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  required
                />
              </div>
              <div>
                <label htmlFor="gender" className="sr-only">
                  Role
                </label>
                <select
                  id="role"
                  name="role"
                  className="appearance-none mt-2 rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  required
                >
                  <option value="role">Role</option>
                  <option value="user">User</option>
                  <option value="delivaryMan">DelivaryMan</option>
                </select>
              </div>
              <div>
                <label htmlFor="gender" className="sr-only">
                  Gender
                </label>
                <select
                  id="gender"
                  name="gender"
                  className="appearance-none mt-2 rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  required
                >
                  <option value="Female">Gender</option>
                  <option value="Female">Female</option>
                  <option value="Male">Male</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <label htmlFor="site" className="sr-only">
                  Site
                </label>
                <input
                  id="site"
                  name="site"
                  type="text"
                  className="appearance-none mt-2 rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Site"
                />
              </div>

              <div>
                <label htmlFor="image" className="sr-only">
                  Profile Image
                </label>
                <input
                  id="image"
                  name="image"
                  type="file"
                  className="appearance-none mt-2 rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  required
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember_me"
                  name="remember_me"
                  type="checkbox"
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="remember_me"
                  className="ml-2 block text-sm text-gray-900"
                >
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a
                  href="/forgot-password"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Forgot your password?
                </a>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md  bg-orange-400  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Sign in
              </button>
            </div>

            <div className="mt-6 flex justify-center space-x-4">
              <button
                type="button"
                className="flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                <FaGoogle className="h-5 w-5 text-red-500" aria-hidden="true" />
                <span className="ml-2">Sign in with Google</span>
              </button>
              <button
                type="button"
                className="flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                <FaGithub className="h-5 w-5 text-black" aria-hidden="true" />
                <span className="ml-2">Sign in with GitHub</span>
              </button>
            </div>

            <div className="mt-6 text-center">
              <span className="text-sm"> have an account? </span>
              <a
                href="/Login"
                className="text-sm text-indigo-600 hover:text-indigo-500"
              >
                Log In
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
