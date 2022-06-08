import { Handler } from '@netlify/functions';
import { Context } from '@netlify/functions/dist/function/context';
import { Event } from '@netlify/functions/dist/function/event';
import { S3 } from 'aws-sdk';
import path from 'path';

const REGION = process.env.REGION || 'us-east-1';
const BUCKET_NAME = process.env.BUCKET_NAME;

const s3Client = new S3({
  region: REGION,
  accessKeyId: process.env.AWS_API_ID,
  secretAccessKey: process.env.AWS_API_SECRET,
});

const handler: Handler = async (event: Event, context: Context) => {
  console.log('Called upload-file');

  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const fileExtension = event.headers['x-extension'];
  const fileName = event.headers['x-file-name'];
  const fileType = event.headers['x-file-type'];
  const fileContent = event.body;
  const buf = Buffer.from(fileContent, 'base64');

  return new Promise<any>((resolve, reject) => {
    s3Client.upload(
      {
        Bucket: BUCKET_NAME,
        Key: path.basename(`${fileName}${fileExtension}`),
        Body: buf,
        ContentEncoding: 'base64',
        ContentType: fileType,
      },
      (error, data) => {
        console.log('CALLBACK', error, data);

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
