import { useContext, useState } from 'react';

import { FileStackContext } from 'src/contexts/FileStackContext';

const FileUploadForm = ({
  imageRecord,
  setImageRecord,
}: {
  imageRecord: any;
  setImageRecord: (upload: any) => void;
}) => {
  const { fileStackClient } = useContext(FileStackContext);
  const [file, setFile] = useState(null);

  const handleFileChange = (event: any) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    try {
      const response = await fileStackClient.upload(file);
      response.url && setImageRecord(response);
    } catch (error) {
      console.error('Upload error:', error);
    }
  };

  return (
    <>
      <input type="file" onChange={handleFileChange} />
      {imageRecord && <img src={imageRecord.url} alt="" />}
      <button onClick={handleUpload}>Upload</button>
    </>
  );
};

export default FileUploadForm;
