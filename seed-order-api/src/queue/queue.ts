import Bull from 'bull';

import {
  type ProductStockUpdate,
  type LowStockEmailJob,
  type Employee,
} from '@becks-interview-project/sdk';

import { config } from '../config';

import { getEmployeeById } from '../entities/employee/employee.service';

const emailQueue = new Bull(config.emailQueueName, {
  redis: config.redis,
});

/**
 * Insert email job into queue
 */
export const insertEmailJobIntoQueue = async (job: LowStockEmailJob) => {
  console.log('Inserting email job into queue', job);

  await emailQueue.add(job);
};

/**
 * Create email job
 */
export const createEmailJob = async (productUpdate: ProductStockUpdate) => {
  const buyer: Employee = await getEmployeeById(productUpdate.buyerId);

  const job: LowStockEmailJob = {
    productId: productUpdate.id,
    productName: productUpdate.name,
    buyerId: buyer.id,
    buyerName: buyer.name,
    buyerEmail: buyer.email,
    stock: productUpdate.stock,
    minimumStock: productUpdate.minimumStock,
  };

  await emailQueue.add(job);
};
