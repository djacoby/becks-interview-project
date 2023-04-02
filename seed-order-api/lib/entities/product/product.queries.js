"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDeleteProductQuery = exports.getUpdateProductQuery = exports.getCreateProductQuery = exports.getGetProductByIdQuery = exports.getGetAllProductsQuery = void 0;
/**
 * Get query to return all products
 */
const getGetAllProductsQuery = () => {
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
exports.getGetAllProductsQuery = getGetAllProductsQuery;
/**
 * Get query to return a product by id
 */
const getGetProductByIdQuery = (id) => {
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
      WHERE "id" = $1
      AND "deleted" IS NULL;
    `,
        replacements: [id],
    };
};
exports.getGetProductByIdQuery = getGetProductByIdQuery;
/**
 * Get query to create a product
 */
const getCreateProductQuery = (product) => {
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
exports.getCreateProductQuery = getCreateProductQuery;
/**
 * Get query to update a product
 */
const getUpdateProductQuery = (productId, product) => {
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
            new Date().toISOString(),
            productId,
        ],
    };
};
exports.getUpdateProductQuery = getUpdateProductQuery;
/**
 * Get query to delete a product
 *
 * Note: This does not actually delete the product, we use a "soft delete" that sets the deleted
 * column to the current timestamp.
 */
const getDeleteProductQuery = (id) => {
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
        replacements: [new Date().toISOString(), id],
    };
};
exports.getDeleteProductQuery = getDeleteProductQuery;
