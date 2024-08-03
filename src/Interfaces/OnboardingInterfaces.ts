export interface IStoreSetupForm {
  bannerUrl?: string;
  logoUrl?: string;
  storeEmail: string;
  phoneNumber?: string;
  storeName: string;
  website?: string;
  description?: string;
  vendaCategoryId?: string;
  apartment?: string | number;
  city?: string;
  province?: string;
  postalCode?: string | number;
  displayNumEmail?: boolean;
}

export interface IBankDetailsStepform {
  id: string;
  name?: string;
  label?: string;
  type?: string;
  defaultValue: string;
  placeholder: string;
  require: boolean;
}

export interface IStoreProductCats {
  subCategoryId: number;
  // name: string;
}
export interface IDeliverySetup {
  allowPickup: string;
  allowPreOrder: string;
  storeStatus: string;
  deliveryFee: number;
  deliveryPeriod?: string;
  pickupTimeFrom: Date;
  pickupTimeTo: Date;
}
export interface IBankDetails {
  fullName: string;
  bankName: string;
  paypalEmail?: string;
  accountNumber: number | string;
  transitNumber: number | string;
}

export interface IServerResponse {
  data: { message: string };
}

export interface IServerError {
  data: { message: string };
}
