import { useState } from 'react';

const Upload = () => {
  const [uploader, setUploader] = useState<'camera' | 'file'>('camera');

  return uploader === 'camera' ? (
    <WebCamForm imageData={imageData} setImageData={setImageData} />
  ) : (
    <FileUploadForm imageRecord={imageRecord} setImageRecord={setImageRecord} />
  );
};
