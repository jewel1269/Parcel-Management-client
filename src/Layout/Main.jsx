import { Outlet } from 'react-router-dom';
import Navber from '../Shared/Home/Navber/Navber';
import Footer from './Footer/Footer';

const Main = () => {
  return (
    <div>
      <Navber />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Main;
