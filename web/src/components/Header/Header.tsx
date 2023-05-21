import { useState } from 'react';

import {
  BookOpenIcon,
  CalendarDaysIcon,
  ChatBubbleOvalLeftIcon,
  HomeIcon,
  PencilSquareIcon,
} from '@heroicons/react/24/outline';

import { Link, routes } from '@redwoodjs/router';

import ScratchPadPage from 'src/pages/ScratchPadPage/ScratchPadPage';

import ProfileMenu from '../ProfileMenu/ProfileMenu';

const Header = () => {
  const [showScratchPad, setShowScratchPad] = useState(false);

  return (
    <ul className="flex h-16 items-center justify-around md:h-full md:flex-col md:justify-between">
      <li className="md:mb-8 md:mt-6">
        <Link to={routes.dashboard()} className="text-blue-500 hover:text-blue-800">
          <CalendarDaysIcon className="header-icon" />
        </Link>
      </li>
      <li className="md:mb-8">
        <Link to={routes.notes()} className="text-blue-500 hover:text-blue-800">
          <PencilSquareIcon className="header-icon" />
        </Link>
      </li>
      <li className="md:mb-8">
        <Link to={routes.journals()} className="text-blue-500 hover:text-blue-800">
          <BookOpenIcon className="header-icon" />
        </Link>
      </li>
      <li className="md:mb-8">
        <Link to={routes.inventory()} className="text-blue-500 hover:text-blue-800">
          <HomeIcon className="header-icon" />
        </Link>
      </li>
      <li className="flex md:mb-8">
        <button onClick={() => setShowScratchPad((old) => !old)} className="text-blue-500 hover:text-blue-800">
          <ChatBubbleOvalLeftIcon className="header-icon" />
        </button>
        <div
          className={
            showScratchPad
              ? 'fixed left-1 right-1 top-20 overflow-hidden md:bottom-5 md:left-16 md:right-0 md:top-5'
              : 'hidden'
          }
        >
          <ScratchPadPage />
        </div>
      </li>
      <li className="md:mb-3 md:mt-auto">
        <ProfileMenu />
      </li>
    </ul>
  );
};

export default Header;
