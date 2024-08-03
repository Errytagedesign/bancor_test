import { ReactNode } from 'react';
import {
  IBankDetails,
  IBankDetailsStepform,
  IDeliverySetup,
  IStoreSetupForm,
} from './OnboardingInterfaces';

export interface TabProps {
  id: string;
  title?: string;
  icon?: ReactNode;
  activeClass?: string;
  notActiveClass?: string;
  activeTab?: string;
  setActiveTab?: (id: string) => void;
}

export interface TabContentsProps {
  id: string;
  activeTab?: string;
  comps?: ReactNode;
}

export interface IStepForm {
  onNext: () => void;
  onPrevious?: () => void;
}

export interface IStoreSetup {
  type?: string;
  label?: string;
  id: string;
  name: string;
  require?: boolean;
  disabled?: boolean;
  placeholder?: string;
  checked?: boolean;
  value?: string | number;
  options?: {
    id?: string;
    title?: string;
    value?: string;
  }[];
  // options?: {
  //   id?: string;
  //   title?: string;
  //   value?: string;
  //   name?: string;
  //   province?: string;
  // }[];
  canadianCities?: { [key: string]: string }[];
  canadianProvince?: { Province: string; City: string[] }[];
}

export interface IModal {
  id: string;
  close?: () => void;
}

export interface ICurrentUser
  extends IStoreSetupForm,
    IBankDetailsStepform,
    IDeliverySetup {
  delivery: IDeliverySetup;
  bank: IBankDetails;
  sellerCategs: {
    subCategory: { subName: string; id: number | string };
  }[];
  vendaCategory: { name: string };
}

export interface IWithdrawReq {
  id: number;
  tranType: string;
  createdAt: string;
  amount: number;
  status: string;
}
