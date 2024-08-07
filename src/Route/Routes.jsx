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
import PrivateRoute from '../Hooks/Private/PrivteRoute';

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
        element: (
          <PrivateRoute>
            <BookParcel />,
          </PrivateRoute>
        ),
      },
      {
        path: 'MyParcels',
        element: (
          <PrivateRoute>
            <MyParcels />,
          </PrivateRoute>
        ),
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
        element: (
          <PrivateRoute>
            <Statistics />
          </PrivateRoute>
        ),
      },
      {
        path: 'AllParcel',
        element: (
          <PrivateRoute>
            <AllParcel />
          </PrivateRoute>
        ),
      },
      {
        path: 'DeliveryMenTable',
        element: (
          <PrivateRoute>
            <DeliveryMenTable />
          </PrivateRoute>
        ),
      },
      {
        path: 'UsersTable',
        element: (
          <PrivateRoute>
            <UsersTable />,
          </PrivateRoute>
        ),
      },

      //delivaryMan
      {
        path: 'MyDeliveryList',
        element: (
          <PrivateRoute>
            <MyDeliveryList />
          </PrivateRoute>
        ),
      },
      {
        path: 'MyReviews',
        element: (
          <PrivateRoute>
            <MyReviews />
          </PrivateRoute>
        ),
      },
      {
        path: 'UpdateBooking/:id',
        element: <UpdateBooking />,
        loader: ({ params }) =>
          fetch(
            `https://parcel-system-manageent-server.vercel.app/bookings/${params.id}`
          ),
      },
    ],
  },
]);
