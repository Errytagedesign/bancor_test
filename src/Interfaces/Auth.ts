export interface ISignIn {
  email: string;
  password: string;
}
export interface ISignUp {
  firstname: string;
  lastname: string;
  middlename: string;
  emailaddress: string;
  phonenumber: string;
  password: string;
}

export interface IResetPassword {
  forgotID: number;
  newPassword: string;
  confirmPassword: string;
}
export interface IVerifyLogins {
  userId: string;
  uniqueVerificationCode: string;
}
export interface IUpdatePassword {
  oldPassword: string;
  newPassword: string;
}