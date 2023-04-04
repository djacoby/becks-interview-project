/**
 * "Shape" of required object to execute queries with pg
 */
export interface Query {
  query: string;
  replacements: any[];
}

/**
 * Product response object from database
 */
export interface Product {
  id: number;
  buyerId: number;
  familyId: number;
  techTypeId: number;
  name: string;
  maturity: string;
  tagline: string;
  yearReleased: number;
  strengths: string;
  bullets: string;
  stock: number;
  minimumStock: number;
  created: string;
  updated: string;
  deleted?: string;
}

/**
 * Product order object
 */
export interface OrderProduct {
  productId: number;
  quantity: number;
}

/**
 * Customer order
 */
export interface CustomerOrder {
  customerId: number;
  products: OrderProduct[];
}

/**
 * Order object
 */
export interface Order {
  id: number;
  customerId: number;
  completed: boolean;
  created: string;
}

/**
 * Order with products
 */
export interface OrderWithProducts extends Order {
  products: OrderProduct[];
}

/**
 * Customer object
 */
export interface Customer {
  id: number;
  name: string;
  organization: string;
  email: string;
  addressLine: string;
  city: string;
  state: string;
  zip: string;
  country: string;
}

/**
 * Low stock email job queue
 */
export interface LowStockEmailJob {
  productId: number;
}
