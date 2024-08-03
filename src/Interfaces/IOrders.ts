export interface IOrderedProducts {
  id: number;
  orderId: number;
  quantity: number;
  productId: number;
  product: {
    amount: number;
    couponCode: string;
    discount: number;
    name: string;
  };
}

export interface IOrderReq {
  id: number;
  orderProducts: IOrderedProducts[];
  address: string;
  deliveryInstruction: string;
  deliveryType: string;
  deliveryStatus?: string;
  phoneNumber: number;
  createdAt?: string;
  buyer: {
    apartment: string;
    city: string;
    createdAt: Date;
    id: number;
    logoUrl: string;
    phoneNumber: number;
    postalCode: string;
    province: string;
    user: { firstName: string; lastName: string };
  };
}
export interface ISalesList {
  id: number;
  product: { name: string; amount: number };
  quantity: number;
  order: {
    address: string;
    deliveryInstruction: string;
    deliveryType: string;
    deliveryStatus?: string;
    phoneNumber: number;
    createdAt?: string;
    quantity: number;
    buyer: {
      apartment: string;
      city: string;
      createdAt: Date;
      id: number;
      logoUrl: string;
      phoneNumber: number;
      postalCode: string;
      province: string;
      user: { firstName: string; lastName: string };
    };
  };
}
