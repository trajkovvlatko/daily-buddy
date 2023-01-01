import { createContext, useEffect, useState } from 'react';
import * as filestack from 'filestack-js';

export const FileStackContext = createContext(null);

const FileStackContextProvider = ({ children }) => {
  const [fileStackClient, setFileStackClient] = useState(null);

  useEffect(() => {
    const client = filestack.init(process.env.FILESTACK_KEY);
    setFileStackClient(client);
  }, []);

  return <FileStackContext.Provider value={{ fileStackClient }}>{children}</FileStackContext.Provider>;
};

export default FileStackContextProvider;
