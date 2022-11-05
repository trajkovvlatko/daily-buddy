import { Link, routes } from '@redwoodjs/router';
import { Toaster } from '@redwoodjs/web/toast';
import { useAuth } from '@redwoodjs/auth';

type LayoutProps = {
  children: React.ReactNode;
};

const ScaffoldLayout = ({ children }: LayoutProps) => {
  const { isAuthenticated, logOut } = useAuth();

  const handleLogOut = async () => {
    await logOut();
    window.location.pathname = '/';
  };

  return (
    <div className="rw-scaffold">
      <Toaster toastOptions={{ className: 'rw-toast', duration: 6000 }} />
      <header className="mb-6 h-16 bg-gray-50">
        <ul className="flex h-full items-center">
          <li className="ml-6 mr-6">
            <Link to={routes.dashboard()} className="text-blue-500 hover:text-blue-800">
              Dashboard
            </Link>
          </li>
          <li className="mr-6">
            <Link to={routes.calendars()} className="text-blue-500 hover:text-blue-800">
              Calendars
            </Link>
          </li>
          {isAuthenticated && (
            <li className="mr-6">
              <button type="button" onClick={handleLogOut}>
                Logout
              </button>
            </li>
          )}
        </ul>
      </header>
      <main className="rw-main">{children}</main>
    </div>
  );
};

export default ScaffoldLayout;
