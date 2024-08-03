import Profile from '@/pages/Profile/Profile';
import Wallet from '@/pages/Wallet/Wallet';
import { ReactElement } from 'react';

interface Route {
  path: string;
  name: string;
  element: ReactElement;
}

const dashboardRoutes: Route[] = [
  { path: '/', name: 'Profile', element: <Profile /> },
  { path: '/wallet', name: 'Orders', element: <Wallet /> },
];

export default dashboardRoutes;
