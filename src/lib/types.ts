export interface Product {
  id: string;
  name: string;
  description: string;
  price: {
    regularPrice: {
      amount: {
        value: number;
        currency: string;
      };
    };
  };
}
