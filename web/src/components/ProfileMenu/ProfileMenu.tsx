import { useState } from 'react';
import MenuList from './MenuList';
import Icon from './Icon';

const ProfileMenu = () => {
  const [open, setOpen] = useState(false);
  console.log(open);

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

  return (
    <>
      <div onClick={() => setOpen(!open)} className="ml-auto mr-7 ">
        <Icon />
      </div>
      <div className={className}>
        <MenuList />
      </div>
    </>
  );
};

export default ProfileMenu;
