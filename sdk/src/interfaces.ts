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
 * Product inventory update object
 */
export interface ProductStockUpdate {
  id: number;
  buyerId: number;
  name: string;
  stock: number;
  minimumStock: number;
}

/**
 * Low stock email job queue
 */
export interface LowStockEmailJob {
  productId: number;
  productName: string;
  buyerId: number;
  buyerName: string;
  buyerEmail: string;
  stock: number;
  minimumStock: number;
}

/**
 * Employee object
 */
export interface Employee {
  id: number;
  departmentId: number;
  name: string;
  email: string;
  created: string;
  updated: string;
}
