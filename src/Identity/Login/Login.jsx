import React, { useState } from 'react';
import {
  useMutation,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  FaGoogle,
  FaFacebook,
  FaGithub,
  FaEyeSlash,
  FaEye,
} from 'react-icons/fa';
import logo from '../../assets/5243321-removebg-preview.png';
import useAuth from '../../Hooks/useAuth';
import { GithubAuthProvider, GoogleAuthProvider } from 'firebase/auth';
import Swal from 'sweetalert2';
import useAxiosInstance from '../../Hooks/useAxiosInstance';
import { toast } from 'react-toastify';

const googleProvider = new GoogleAuthProvider();
const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { signIn, googleLogin, githubLogin } = useAuth();
  const axiosInstance = useAxiosInstance();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const handleChange = e => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    const formDataToSend = new FormData();
    console.log(formData);
    signIn(formData.email, formData.password)
      .then(res => {
        console.log(res.user);
        navigate(location.state) || navigate('/');
      })
      .then(error => console.log(error));

    for (const key in formData) {
      formDataToSend.append(key, formData[key]);
    }
  };
  const loginWithGoogle = () => {
    googleLogin(googleProvider).then(result => {
      console.log(result.user);
      const userFind = {
        iamge: result.user.photoURL,
        email: result.user.email,
        name: result.user.displayName,
        role: 'user',
      };
      axiosInstance.post('/users', userFind).then(res => {
        console.log(res.data);
      });
    });
    toast.success('Successfully Login');
    navigate('/');
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
            LogIn to your account
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
                  value={formData.name}
                  onChange={handleChange}
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Name"
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
                  onChange={handleChange}
                  value={formData.email}
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
                  value={formData.password}
                  onChange={handleChange}
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
                Log in
              </button>
            </div>

            <div className="mt-6 flex justify-center space-x-4">
              <button
                type="button"
                className="flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                <FaGoogle className="h-5 w-5 text-red-500" aria-hidden="true" />
                <span onClick={loginWithGoogle} className="ml-2">
                  Sign in with Google
                </span>
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
              <span className="text-sm">Don't have an account? </span>
              <a
                href="/SignIn"
                className="text-sm text-indigo-600 hover:text-indigo-500"
              >
                Sign up for free
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
