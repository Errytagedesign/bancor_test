import { IResetPassword, ISignIn, ISignUp } from '@/Interfaces/Auth';
import baseAPI from './axiosInstances';

export const SignUp = async (formData: ISignUp) => {
  return await baseAPI.post('/api/Account/Register', formData);
};
export const SignIn = async (formData: ISignIn) => {
  return await baseAPI.post('/auth/login', formData);
};

export const verifyEmail = async (formData: {
  emailAddress: string;
  activationCode: string;
}) => {
  return await baseAPI.post(`/api/Account/ConfirmActivationCode`, formData);
};

export const verifyPassword = async (formData: {
  emailAddress: string;
  code: string;
}) => {
  return await baseAPI.post(`/api/Account/VerifyPasswordCode`, formData);
};

export const requestPasswordChange = async (formData: { email: string }) => {
  return await baseAPI.post(`/api/Account/ForgotPassword`, formData);
};

export const resetPassword = async (formData: IResetPassword, token: any) => {
  return await baseAPI.post(`/auth/reset-password?token=${token}`, formData);
};

export const getRoles = async () => {
  return await baseAPI.get(`/api/Role/Roles`);
};
