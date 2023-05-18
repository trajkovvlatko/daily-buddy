import { ReactNode } from 'react';

const AdminPageWrapper = ({ children }: { children: ReactNode }) => {
  return <div className="p-6">{children}</div>;
};

export default AdminPageWrapper;
