export async function uploadFile(file: File, fileName: string) {
  const imageType = file.type.split('image/')[1];
  const fileExtension = `.${imageType}`;

  console.log(
    'to be uploaded',
    typeof file,
    file.type,
    fileExtension,
    fileName
  );

  try {
    const response = await fetch('/.netlify/functions/upload-file', {
      method: 'POST',
      body: file,
      headers: {
        'X-FILE-NAME': fileName,
        'X-FILE-TYPE': file.type,
      },
    });
    console.log('Uploaded succeeded', response);
    // const responseJson = await response.json();
    // console.log('Uploaded succeededk JSON', responseJson);
    return response;
  } catch (error) {
    console.error('Error happened!', error);
    throw error;
  }
}
