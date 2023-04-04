import Bull from 'bull';
import * as nodemailer from 'nodemailer';

import { config } from './config';

const emailQueue = new Bull(config.emailQueueName, {
  redis: config.redis,
});

const init = async () => {
  console.log('Starting email worker');

  await emailQueue.process(async (job) => {
    console.log('Recieved email job', job.id);

    const testAccount = await nodemailer.createTestAccount();

    const transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    });

    const info = await transporter.sendMail({
      from: 'Re-order product <lowstock@seed-stock.com>',
      to: job.data.buyerEmail,
      subject: `Seed ${job.data.productName} stock low`,
      text: `Product: ${job.data.productName} current stock is currrently at ${job.data.stock} units and is below the minimum stock of ${job.data.minimumStock} units. Please re-order this product.`,
    });

    console.log('Message sent: %s', info.messageId);

    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  });
};

init().catch(console.error);
