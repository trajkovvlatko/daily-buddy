import { createContext, useEffect, useState } from 'react';

import * as filestack from 'filestack-js';
import { TypedDocumentNode, useQuery } from '@redwoodjs/web';
import { useAuth } from 'src/auth';

export const FileStackContext = createContext(null);

export const QUERY: TypedDocumentNode<{ id: number, value: string }, { key: string }> =
  gql`
    query FindSettingByKey($key: String!) {
      settingByKey(key: $key) {
        id
        value
      }
    }
  `;

const FileStackContextProvider = ({ children }) => {
  const { isAuthenticated } = useAuth();

  const [fileStackClient, setFileStackClient] = useState<filestack.Client | null>(null);
  const {
    data: settingsData,
  } = useQuery<{ settingByKey: { id: number, value: string } }, { key: string }>(QUERY, {
    variables: { key: 'filestack_api_key' },
    skip: !isAuthenticated,
  });

  useEffect(() => {
    if (settingsData?.settingByKey?.value) {
      const client = filestack.init(settingsData.settingByKey.value);
      setFileStackClient(client);
    }
  }, [settingsData]);

  if (!isAuthenticated || !fileStackClient) return children;

  return <FileStackContext.Provider value={{ fileStackClient }}>{children}</FileStackContext.Provider>;
};

export default FileStackContextProvider;
