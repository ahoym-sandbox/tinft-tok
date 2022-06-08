export async function uploadFile(
  fileContent: any,
  fileExtension: string,
  hexEncodedName: string
) {
  const formData = new FormData();
  formData.append('file', fileContent);
  formData.append('fileExtension', fileExtension);
  formData.append('fileName', hexEncodedName);

  try {
    const response = await fetch('./netlify/functions/upload-file', {
      method: 'POST',
      body: formData,
    });
    console.log('Uploaded succeeded', response);
    return response;
  } catch (error) {
    console.error('Error happened!', error);
    throw error;
  }
}
