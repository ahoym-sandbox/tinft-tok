import { Handler } from '@netlify/functions';
import { Context } from '@netlify/functions/dist/function/context';
import { Event } from '@netlify/functions/dist/function/event';
import { S3 } from 'aws-sdk';
import path from 'path';

const REGION = process.env.REGION || 'us-east-1';
const BUCKET_NAME = process.env.BUCKET_NAME;

const s3Client = new S3({
  region: REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_ACCESS_KEY_SECRET,
});

const handler: Handler = async (event: Event, context: Context) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  // TODO - Translate request?
  const request = JSON.parse(event.body).txJson;
  const { fileContent, fileExtension, fileName } = request;
  console.log('typeof', typeof fileContent);

  new Promise((resolve, reject) => {
    s3Client.upload(
      {
        Bucket: BUCKET_NAME,
        Key: path.basename(`${fileName}.${fileExtension}`),
        Body: fileContent,
      },
      {},
      (error, data) => {
        if (error) {
          console.error('Upload Error', error);
          reject({
            statusCode: 500,
            error,
          });
        }

        resolve({
          statusCode: 200,
          body: JSON.stringify(data),
        });
      }
    );
  });
};

export { handler };
