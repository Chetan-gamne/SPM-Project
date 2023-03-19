export interface Product {
  _id?: string;
  title: string;
  description?: string;
  createdDate?: Date;
  updatedDate?: Date;
  price?: number;
  // quantity?: number;
  grains: Grains[];
  storeOwnerId?: string;
}

interface Grains {
  grain: string;
  proportion: number;
}
