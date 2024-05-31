import { useContext } from 'react';
import { AuthContext } from '../Componant/AuthProvider/AuthProvider';

const useAuth = () => {
  const userInfo = useContext(AuthContext);

  if (userInfo === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return userInfo;
};

export default useAuth;
