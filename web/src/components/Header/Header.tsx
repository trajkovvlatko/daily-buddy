import { Link, routes } from '@redwoodjs/router';
import ProfileMenu from '../ProfileMenu/ProfileMenu';

const Header = () => {
  return (
    <header className="mb-2 h-16 w-full shadow-lg">
      <div className="h-full items-center overflow-auto">
        <ul className="flex  h-full items-center">
          <li className="ml-6 mr-6">
            <Link to={routes.dashboard()} className="text-blue-500 hover:text-blue-800">
              Dashboard
            </Link>
          </li>
          <li className="mr-6">
            <Link to={routes.notes()} className="text-blue-500 hover:text-blue-800">
              Notes
            </Link>
          </li>
          <li className="mr-6">
            <Link to={routes.journals()} className="text-blue-500 hover:text-blue-800">
              Journal
            </Link>
          </li>
          <ProfileMenu />
        </ul>
      </div>
    </header>
  );
};

export default Header;
