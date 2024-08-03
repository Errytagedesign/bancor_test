import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import generalRoutes from './Layout/Routes/GeneralRutes';
import dashboardRoutes from './Layout/Routes/DashboardRoutes';
import DashboardLayout from './Layout/DashboardLayout';
import NotFound from './pages/404/NotFound';

const App = () => {
  return (
    <main>
      <Router>
        <Routes>
          {generalRoutes.map((route, idx: number) => (
            <Route key={idx} path={route.path} element={route.element} />
          ))}
          {dashboardRoutes.map((route, idx: number) => (
            <Route
              key={idx}
              path={route.path}
              element={<DashboardLayout>{route.element}</DashboardLayout>}
            />
          ))}

          <Route path='*' element={<NotFound />} />
        </Routes>
      </Router>
    </main>
  );
};

export default App;
