import { IResetPassword, ISignIn, ISignUp } from '@/Interfaces/Auth';
import baseAPI from './axiosInstances';

export const SignUp = async (formData: ISignUp) => {
  return await baseAPI.post('/api/Account/Register', formData);
};
export const SignIn = async (formData: ISignIn) => {
  return await baseAPI.post('/api/Account/Authenticate', formData);
};

export const verifyEmail = async (formData: {
  emailAddress: string;
  activationCode: string;
}) => {
  return await baseAPI.post(`/api/Account/ConfirmActivationCode`, formData);
};

export const verifyPasswordCode = async (formData: {
  emailAddress: string;
  code: string;
}) => {
  return await baseAPI.post(`/api/Account/VerifyPasswordCode`, formData);
};

export const requestPasswordChange = async (formData: {
  emailAddress: string;
}) => {
  return await baseAPI.post(`/api/Account/ForgotPassword`, formData);
};

export const resetPassword = async (formData: IResetPassword) => {
  return await baseAPI.post(`/api/Account/ResetPassword`, formData);
};

export const getRoles = async () => {
  return await baseAPI.get(`/api/Role/Roles`);
};

export const getCurrentUser = async () => {
  return await baseAPI.get(`/api/User/Profile`);
};
