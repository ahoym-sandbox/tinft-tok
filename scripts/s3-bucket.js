const { S3 } = require('aws-sdk');
const { readFileSync } = require('fs');
const path = require('path');

const REGION = 'us-east-1';
const BUCKET_NAME = process.env.BUCKET_NAME;

const s3Client = new S3({
  region: REGION,
  accessKeyId: process.env.AWS_API_ID,
  secretAccessKey: process.env.AWS_API_SECRET,
});

const bucketParams = {
  Bucket: BUCKET_NAME,
};

const listObjects = async () => {
  try {
    const data = await s3Client.getSignedUrl(
      'ListObjectsCommand',
      bucketParams
    );
    console.log('listObjects Success', data);
    console.log('listObjects Success', data.Buckets);
  } catch (error) {
    console.error('listObjects Error', error);
  }
};
// listObjects();

const uploadFile = async (relativeFileName) => {
  const fileContent = readFileSync(path.join(__dirname, relativeFileName));
  const actualFileName = path.basename(relativeFileName);
  console.log('typeof', typeof fileContent);
  console.log('path basename');

  try {
    const data = await s3Client.upload(
      {
        Bucket: BUCKET_NAME,
        Key: path.basename(`${Date.now().toString()}-${actualFileName}`),
        Body: fileContent,
      },
      {},
      (error, data) => {
        if (error) {
          console.error('Upload Error', error);
          throw error;
        }

        console.log('Upload success0', data);
      }
    );
    console.log('Upload Success1', data);
  } catch (error) {
    console.error('Upload Error1', error);
  }
};
uploadFile('../public/lol.jpeg');
