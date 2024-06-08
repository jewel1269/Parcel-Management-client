import React, { useState, useEffect } from 'react';
import useAxiosInstance from '../../../Hooks/useAxiosInstance';
import { useQuery } from '@tanstack/react-query';
import useGetData from '../../../Hooks/useGetData';
import useAuth from '../../../Hooks/useAuth';

const MyReviews = () => {
  const [userInfo] = useGetData();
  const { user } = useAuth();

  const axiosInstance = useAxiosInstance();

  const { refetch, data: reviews = [] } = useQuery({
    queryKey: ['review', userInfo?.email],
    queryFn: async () => {
      const res = await axiosInstance.get(
        `/AllReviews?email=${
          userInfo?.email || userInfo[0]?.email || user?.email
        }`
      );
      return res.data;
    },
    enabled: !!userInfo?.email,
  });
  console.log(reviews);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">My Reviews</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {reviews.map(review => (
          <div
            key={review._id}
            className="bg-white p-4 rounded-lg shadow-lg border"
          >
            <div className="flex items-center mb-4">
              <img
                src={review.userImage}
                alt={`${review.userName}'s profile`}
                className="w-12 h-12 rounded-full mr-4"
              />
              <div>
                <h2 className="text-lg font-semibold">{review.userName}</h2>
                <p className="text-sm text-gray-600">{review.reviewDate}</p>
              </div>
            </div>
            <div className="mb-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, index) => (
                  <svg
                    key={index}
                    className={`w-5 h-5 ${
                      index < review.rating
                        ? 'text-yellow-400'
                        : 'text-gray-300'
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.21c.969 0 1.372 1.24.588 1.81l-3.405 2.48a1 1 0 00-.364 1.118l1.287 3.967c.3.921-.755 1.688-1.54 1.118l-3.405-2.48a1 1 0 00-1.176 0l-3.405 2.48c-.784.57-1.839-.197-1.54-1.118l1.287-3.967a1 1 0 00-.364-1.118l-3.405-2.48c-.784-.57-.38-1.81.588-1.81h4.21a1 1 0 00.95-.69l1.286-3.967z" />
                  </svg>
                ))}
              </div>
            </div>
            <p className="text-gray-700">{review.feedback}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyReviews;
