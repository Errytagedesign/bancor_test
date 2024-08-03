// export interface IProductList {
//   id: string | number;
//   title: string;
//   productImage: string;
//   status: string;
//   price: number;
//   description: string;
//   deliveryTime: string;
// }

export interface IProductById {
  product: {
    id: string | number;
    name: string;
    amount: number;
    description: string;
    productImages: {
      name: string;
      url: string;
    }[];
    couponCode: string;
    discount: number;
    sellerCategId: number;
  };
}
export interface IProductTemp {
  id: string | number;
  name: string;
  amount: number;
  description: string;
  productImages: {
    name: string;
    url: string;
  }[];
}

export interface IGetSellerCat {
  avatar?: string | any;
  subCategoryId?: number;
  id?: number | string;
  name?: string;
  vendaCategoryId?: number;
}

export interface ICartData {
  orderProduct: {
    id: number;
    quantity: number;
  };
  name: string;
  amount: number;
}

export interface ICartItems extends ICartData {
  styles?: any;
  // storeData: IStoreUser;
  buyerData: any;
}

// ==== ADVERTS ===

export interface IBudgetData {
  id: number;
  duration: string;
  amount: number;
  loop: number;
  tax: number;
}
export interface ICreateAds {
  upload1: string;
  upload2: string;
  campaignName: string;
  startDate: string;
  endDate: string;
  productId: number | string;
  budgetId: number | string;
  budgetData: IBudgetData[];
}
export interface IGetAllAds {
  id: number | string;
  status: string;
  upload1: string;
  upload2: string;
  amount: number;
  startDate: Date;
  endDate: Date;
  approvalStatus: string;
}
