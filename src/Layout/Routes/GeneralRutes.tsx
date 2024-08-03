// generalRoutes.js

import ChangePassword from '@/pages/Auth/ChangePassword';
import ForgotPasswordRequest from '@/pages/Auth/ForgotPasswordRequest';
import Signin from '@/pages/Auth/Signin/Signin';
import Signup from '@/pages/Auth/Signup/Signup';
import VerifyEmail from '@/pages/Auth/VerifyEmail';
import { ReactElement } from 'react';

interface Route {
  path: string;
  element: ReactElement;
}

const generalRoutes: Route[] = [
  { path: '/signup', element: <Signup /> },
  { path: '/signin', element: <Signin /> },
  { path: '/forgot-password', element: <ForgotPasswordRequest /> },
  { path: '/reset-password', element: <ChangePassword /> },
  { path: '/verify-email', element: <VerifyEmail /> },
];

export default generalRoutes;
