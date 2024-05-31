import { Outlet } from 'react-router-dom';
import Navber from '../Shared/Home/Navber/Navber';

const Main = () => {
  return (
    <div>
      <Navber />
      <Outlet />
    </div>
  );
};

export default Main;
