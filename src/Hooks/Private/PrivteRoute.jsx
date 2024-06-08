import { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import img from '../../assets/Features/160139-OV2ZS8-552-removebg-preview (1).png';
import 'animate.css';
import { AuthContext } from '../../Componant/AuthProvider/AuthProvider';

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-white">
        <div className="flex flex-col items-center">
          <img
            src={img}
            alt="Ice Cream Icon"
            className="w-56 h-56 animate__animated animate__shakeX animation-duration: 10s; mb-4"
          />
          <h1 className="text-2xl font-bold text-center">
            Loading.................
          </h1>
        </div>
      </div>
    );
  }
  if (user) {
    return children;
  }

  return <Navigate to={'/Login'} state={location.pathname} />;
};

export default PrivateRoute;
