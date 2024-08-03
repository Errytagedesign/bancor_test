/* eslint @typescript-eslint/no-explicit-any: "off" */

import NavBar from '@/components/Header/NavBar';
import { useGlobalContext } from '@/context/GlobalContext';
import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

interface Layout {
  children: ReactNode;
}
const DashboardLayout: React.FC<Layout> = ({ children }) => {
  const { isLoggedIn } = useGlobalContext();
  if (!isLoggedIn) {
    return <Navigate to='/signin' replace />;
  }

  return (
    <main className=''>
      <NavBar />
      {children}
    </main>
  );
};

export default DashboardLayout;
