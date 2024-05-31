import { createBrowserRouter } from 'react-router-dom';
import Main from '../Layout/Main';
import Home from '../Shared/Home/Home';
import SignIn from '../Identity/SignInComponent/SignIn';
import Login from '../Identity/Login/Login';
import Dashboard from '../Layout/Dashboard';
import BookParcel from '../Dashbord/FormComponent/BookParcel';

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
      {
        path: 'BookParcel',
        element: <BookParcel />,
      },
    ],
  },
]);
