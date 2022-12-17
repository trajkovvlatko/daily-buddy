import { Toaster } from '@redwoodjs/web/toast';
import Header from 'src/components/Header/Header';

type LayoutProps = {
  children: React.ReactNode;
};

const ScaffoldLayout = ({ children }: LayoutProps) => {
  return (
    <div className="rw-scaffold">
      <Toaster toastOptions={{ className: 'rw-toast', duration: 6000, position: 'top-right' }} />
      <Header />
      <main>{children}</main>
    </div>
  );
};

export default ScaffoldLayout;
