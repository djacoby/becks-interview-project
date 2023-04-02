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
