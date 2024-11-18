import App from './App';
import ContactPage from './pages/ContactPage';
import ProjectsPage from './pages/ProjectsPage';
import ErrorPage from './pages/ErrorPage';
import AboutMePage from './pages/AboutMePage';

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
  {
    path: '/projects',
    element: <ProjectsPage />,
  },
  {
    path: '/about',
    element: <AboutMePage />,
  },
];

export default routes;
