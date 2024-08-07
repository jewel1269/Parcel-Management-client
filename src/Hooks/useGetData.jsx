import { useQuery } from '@tanstack/react-query';
import { useContext } from 'react';
import useAxiosInstance from './useAxiosInstance';
import { AuthContext } from '../Componant/AuthProvider/AuthProvider';

const useGetData = () => {
  const axiosInstance = useAxiosInstance();
  const { user } = useContext(AuthContext);

  const { refetch, data: userInfo = [] } = useQuery({
    queryKey: ['user', user?.email],
    queryFn: async () => {
      if (!user?.email) {
        return [];
      }
      const res = await axiosInstance.get(`/usersInfo?email=${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  return [userInfo, refetch];
};

export default useGetData;
