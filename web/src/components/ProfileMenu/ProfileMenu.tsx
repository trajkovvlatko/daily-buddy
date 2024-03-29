import { useState } from 'react';

import Icon from './Icon';
import MenuList from './MenuList';

const ProfileMenu = () => {
  const [open, setOpen] = useState(false);

  const menuClassName = [
    'absolute',
    'md:left-20',
    'left-auto',
    'top-20',
    'right-3',
    'md:right-auto',
    'md:top-auto',
    'md:bottom-3',
    'md:mb-1',
    'md:mr-2',
    'bg-white',
    'shadow-xl',
    'z-10',
    open ? 'block' : 'hidden',
  ].join(' ');

  const toggleOpen = () => {
    setOpen((oldValue) => !oldValue);
  };

  return (
    <>
      <div onClick={toggleOpen} className="mb-3 mt-3 flex justify-center">
        <Icon />
      </div>
      <div className={menuClassName}>
        <MenuList callback={toggleOpen} />
      </div>
    </>
  );
};

export default ProfileMenu;
