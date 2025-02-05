import { Toaster } from '@redwoodjs/web/toast';

import Header from 'src/components/Header/Header';

type LayoutProps = {
  children: React.ReactNode;
};

const ScaffoldLayout = ({ children }: LayoutProps) => {
  return (
    <div className="rw-scaffold">
      <Toaster toastOptions={{ className: 'rw-toast', duration: 3000, position: 'top-right' }} />
      <div className="left-0 right-0 top-0 w-full bg-white shadow-lg md:fixed md:bottom-0 md:w-16 z-10">
        <Header />
      </div>
      <main className="mt-3 bg-gray-100 md:ml-16 md:mt-0 md:h-screen">{children}</main>
    </div>
  );
};

export default ScaffoldLayout;
