import { type Product } from '@becks-interview-project/sdk';

import { type Query } from '../../interface';

/**
 * Get query to return all products
 */
export const getGetAllProductsQuery = (): Query => {
  return {
    query: `
      SELECT
        "id"
        ,"buyerId"
        ,"familyId"
        ,"techTypeId"
        ,"name"
        ,"maturity"
        ,"tagline"
        ,"yearReleased"
        ,"strengths"
        ,"bullets"
        ,"stock"
        ,"minimumStock"
        ,"created"
        ,"updated"
      FROM product
      WHERE "deleted" IS NULL
      ORDER BY "familyId" ASC;
  `,
    replacements: [],
  };
};

/**
 * Get query to return a product by id
 */
export const getGetProductByIdQuery = (id: number): Query => {
  return {
    query: `
      SELECT
        "id"
        ,"buyerId"
        ,"familyId"
        ,"techTypeId"
        ,"type name"
        ,"maturity"
        ,"tagline"
        ,"yearReleased"
        ,"strengths"
        ,"bullets"
        ,"stock"
        ,"minimumStock"
        ,"created"
        ,"updated"
      FROM product
      WHERE "id" = $1
      AND "deleted" IS NULL;
    `,
    replacements: [id],
  };
};

/**
 * Get query to create a product
 */
export const getCreateProductQuery = (product: Product): Query => {
  return {
    query: `
      INSERT INTO product (
        "buyerId"
        ,"familyId"
        ,"techTypeId"
        ,"name"
        ,"maturity"
        ,"tagline"
        ,"yearReleased"
        ,"strengths"
        ,"bullets"
        ,"stock"
        ,"minimumStock"
      ) VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11
      ) RETURNING
        "id"
        ,"buyerId"
        ,"familyId"
        ,"techTypeId"
        ,"name"
        ,"maturity"
        ,"tagline"
        ,"yearReleased"
        ,"strengths"
        ,"bullets"
        ,"stock"
        ,"minimumStock"
        ,"created"
        ,"updated";
    `,
    replacements: [
      product.buyerId,
      product.familyId,
      product.techTypeId,
      product.name,
      product.maturity,
      product.tagline,
      product.yearReleased,
      product.strengths,
      product.bullets,
      product.stock,
      product.minimumStock,
    ],
  };
};

/**
 * Get query to update a product
 */
export const getUpdateProductQuery = (
  productId: number,
  product: Product,
): Query => {
  return {
    query: `
      UPDATE product
      SET
        "buyerId" = $1
        ,"familyId" = $2
        ,"techTypeId" = $3
        ,"name" = $4
        ,"maturity" = $5
        ,"tagline" = $6
        ,"yearReleased" = $7
        ,"strengths" = $8
        ,"bullets" = $9
        ,"stock" = $10
        ,"minimumStock" = $11
        ,"updated" = $12
      WHERE "id" = $13
      RETURNING
        "id"
        ,"buyerId"
        ,"familyId"
        ,"techTypeId"
        ,"name"
        ,"maturity"
        ,"tagline"
        ,"yearReleased"
        ,"strengths"
        ,"bullets"
        ,"stock"
        ,"minimumStock"
        ,"created"
        ,"updated";
    `,
    replacements: [
      product.buyerId,
      product.familyId,
      product.techTypeId,
      product.name,
      product.maturity,
      product.tagline,
      product.yearReleased,
      product.strengths,
      product.bullets,
      product.stock,
      product.minimumStock,
      'NOW()',
      productId,
    ],
  };
};

/**
 * Get query to delete a product
 *
 * Note: This does not actually delete the product, we use a "soft delete" that sets the deleted
 * column to the current timestamp.
 */
export const getDeleteProductQuery = (id: number): Query => {
  return {
    query: `
      UPDATE product
      SET "deleted" = $1
      WHERE "id" = $2
      RETURNING
        "id"
        ,"buyerId"
        ,"familyId"
        ,"techTypeId"
        ,"name"
        ,"maturity"
        ,"tagline"
        ,"yearReleased"
        ,"strengths"
        ,"bullets"
        ,"stock"
        ,"minimumStock"
        ,"created"
        ,"updated"
        ,"deleted";
    `,
    replacements: ['NOW()', id],
  };
};

/**
 * Update product inventory
 */
export const getUpdateProductInventoryQuery = (
  productId: number,
  quantity: number,
): Query => {
  return {
    query: `
      UPDATE product
      SET "stock" = "stock" - $1
      WHERE "id" = $2
      RETURNING "id", "buyerId", "name", "stock", "minimumStock";
    `,
    replacements: [quantity, productId],
  };
};
