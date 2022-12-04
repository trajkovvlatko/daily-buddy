import { useState } from 'react';
import MenuList from './MenuList';
import Icon from './Icon';

const ProfileMenu = () => {
  const [open, setOpen] = useState(false);

  const className = [
    'absolute',
    'right-0',
    'top-16',
    'mt-1',
    'mr-2',
    'bg-white',
    'shadow-lg',
    open ? 'block' : 'hidden',
  ].join(' ');

  const toggleOpen = () => {
    setOpen((oldValue) => !oldValue);
  };

  return (
    <>
      <div onClick={toggleOpen} className="ml-auto mr-7 ">
        <Icon />
      </div>
      <div className={className}>
        <MenuList callback={toggleOpen} />
      </div>
    </>
  );
};

export default ProfileMenu;
