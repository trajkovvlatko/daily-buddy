import { navigate, Link, routes } from '@redwoodjs/router';

import { useAuth } from '../../auth';

const MenuList = ({ callback }: { callback: () => void }) => {
  const { isAuthenticated, logOut } = useAuth();

  const handleLogOut = async () => {
    callback();
    await logOut();
    window.location.pathname = '/';
  };

  const onLinkClick = () => {
    callback();
  };

  return (
    <ul className="">
      {isAuthenticated ? (
        <>
          <li className="menu-link">
            <Link to={routes.calendars()} onClick={onLinkClick}>
              Calendars
            </Link>
          </li>
          <li className="menu-link">
            <Link to={routes.streaks()} onClick={onLinkClick}>
              Streaks
            </Link>
          </li>
          <li className="menu-link">
            <Link to={routes.colors()} onClick={onLinkClick}>
              Colors
            </Link>
          </li>
          <li className="menu-link">
            <Link to={routes.itemTypes()} onClick={onLinkClick}>
              Item types
            </Link>
          </li>
          <li className="menu-link">
            <Link to={routes.shoppingLists()} onClick={onLinkClick}>
              Shopping lists
            </Link>
          </li>
          <li className="menu-link">
            <Link to={routes.people()} onClick={onLinkClick}>
              People
            </Link>
          </li>
          <li className="menu-link">
            <button type="button" onClick={handleLogOut}>
              Logout
            </button>
          </li>
        </>
      ) : (
        <li className="menu-link">
          <button type="button" onClick={() => navigate(routes.login())}>
            Login
          </button>
        </li>
      )}
    </ul>
  );
};

export default MenuList;
