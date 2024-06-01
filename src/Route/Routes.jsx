import { createBrowserRouter } from 'react-router-dom';
import Main from '../Layout/Main';
import Home from '../Shared/Home/Home';
import SignIn from '../Identity/SignInComponent/SignIn';
import Login from '../Identity/Login/Login';
import Dashboard from '../Layout/Dashboard';
import BookParcel from '../Dashbord/FormComponent/BookParcel';
import MyParcels from '../Dashbord/MyParcels/MyParcels';
import Payment from '../Dashbord/Payment/Payment';
import MyProfile from '../Dashbord/MyProfile/MyProfile';
import Statistics from '../Dashbord/Admin/Statistics';
import AllParcel from '../Dashbord/Admin/AllParcel/AllParcel';
import DeliveryMenTable from '../Dashbord/Admin/DeliveryMenTable/DeliveryMenTable';
import UsersTable from '../Dashbord/Admin/UsersTable/UsersTable';
import MyDeliveryList from '../Dashbord/DelibaryMan/MyDeliveryList/MyDeliveryList';
import MyReviews from '../Dashbord/DelibaryMan/MyReviews/MyReviews';
import UpdateBooking from '../Dashbord/Admin/UsersTable/Update/UpdateBooking';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
    // errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
    ],
  },
  {
    path: 'SignIn',
    element: <SignIn />,
  },
  {
    path: 'Login',
    element: <Login />,
  },
  {
    path: 'Dashboard',
    element: <Dashboard />,
    children: [
      //user
      {
        path: 'BookParcel',
        element: <BookParcel />,
      },
      {
        path: 'MyParcels',
        element: <MyParcels />,
      },
      {
        path: 'Payment',
        element: <Payment />,
      },
      {
        path: 'MyProfile',
        element: <MyProfile />,
      },

      //Admin
      {
        path: 'Statistics',
        element: <Statistics />,
      },
      {
        path: 'AllParcel',
        element: <AllParcel />,
      },
      {
        path: 'DeliveryMenTable',
        element: <DeliveryMenTable />,
      },
      {
        path: 'UsersTable',
        element: <UsersTable />,
      },

      //delivaryMan
      {
        path: 'MyDeliveryList',
        element: <MyDeliveryList />,
      },
      {
        path: 'MyReviews',
        element: <MyReviews />,
      },
      {
        path: 'UpdateBooking/:id',
        element: <UpdateBooking />,
        loader: ({ params }) =>
          fetch(`http://localhost:5000/bookings/${params.id}`),
      },
    ],
  },
]);
