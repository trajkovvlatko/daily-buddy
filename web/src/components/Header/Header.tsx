import {
  BookOpenIcon,
  CalendarDaysIcon,
  ChatBubbleOvalLeftIcon,
  HomeIcon,
  PencilSquareIcon,
} from '@heroicons/react/24/outline';

import { Link, routes } from '@redwoodjs/router';

import ProfileMenu from '../ProfileMenu/ProfileMenu';

const Header = () => {
  return (
    <ul className="flex h-16 items-center justify-around md:h-full md:flex-col md:justify-between">
      <li className="md:mb-8 md:mt-6">
        <Link to={routes.dashboard()} className="text-blue-500 hover:text-blue-800">
          <CalendarDaysIcon className="h-6 w-6 text-blue-500" />
        </Link>
      </li>
      <li className="md:mb-8">
        <Link to={routes.notes()} className="text-blue-500 hover:text-blue-800">
          <PencilSquareIcon className="h-6 w-6 text-blue-500" />
        </Link>
      </li>
      <li className="md:mb-8">
        <Link to={routes.journals()} className="text-blue-500 hover:text-blue-800">
          <BookOpenIcon className="h-6 w-6 text-blue-500" />
        </Link>
      </li>
      <li className="md:mb-8">
        <Link to={routes.inventory()} className="text-blue-500 hover:text-blue-800">
          <HomeIcon className="h-6 w-6 text-blue-500" />
        </Link>
      </li>
      <li className="md:mb-8">
        <Link to={routes.scratchPad()} className="text-blue-500 hover:text-blue-800">
          <ChatBubbleOvalLeftIcon className="h-6 w-6 text-blue-500" />
        </Link>
      </li>
      <li className="md:mb-3 md:mt-auto">
        <ProfileMenu />
      </li>
    </ul>
  );
};

export default Header;
