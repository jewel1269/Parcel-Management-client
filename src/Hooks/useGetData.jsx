import { useQuery } from '@tanstack/react-query';
import { useContext } from 'react';
import useAxiosInstance from './useAxiosInstance';
import { AuthContext } from '../Componant/AuthProvider/AuthProvider';

const useGetData = () => {
  const axiosInstance = useAxiosInstance();

  const { user } = useContext(AuthContext);
  const { refetch, data: userInfo = [] } = useQuery({
    queryKey: ['payment', user?.email],
    queryFn: async () => {
      const res = await axiosInstance.get(`/users?email=${user?.email}`);
      return res.data;
    },
  });
  return [userInfo, refetch];
};

export default useGetData;
