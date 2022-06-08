import ExifReader from 'exifreader';

export function logAndPass(result: any) {
  console.log(result);
  return result;
}

export function logMessageAndPass(message: string) {
  return function (result: any) {
    console.log(message);
    console.log(result);
    return result;
  };
}

export async function extractMetadata(file: File) {
  const tags = await ExifReader.load(file);
  console.log('File tags: ', tags);
  console.log('File size: ', file.size);
  console.log('File last modified date: ', file.lastModified);
  return tags;
}
