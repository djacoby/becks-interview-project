import Bull from 'bull';

import { config } from './config';

import { type LowStockEmailJob } from './interface';

const emailQueue = new Bull(config.emailQueueName, {
  redis: config.redis,
});

/**
 * Create email queue job
 */
export const createEmailJob = async (job: LowStockEmailJob) => {
  console.log('Creating email job', job);

  await emailQueue.add(job);
};
