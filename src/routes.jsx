import App from './App';
import ContactPage from './pages/ContactPage';
import ErrorPage from './pages/ErrorPage';

const routes = [
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/contact',
    element: <ContactPage />,
  },
];

export default routes;
