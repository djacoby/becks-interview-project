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
      to: 'djacoby@seed-stock.com',
      subject: 'Seed stock low',
      text: `${job.data.productId} is low on stock`,
    });

    console.log('Message sent: %s', info.messageId);

    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  });
};

init().catch(console.error);
