import { useState } from 'react';
import NewRoom from '../Room/NewRoom';
import RoomsCell from '../Room/RoomsCell';

const RoomsMenu = () => {
  const [open, setOpen] = useState(false);
  const toggle = () => setOpen(!open);

  return (
    <>
      <h2 className="h2 mb-6">
        Rooms
        <button onClick={toggle} className="green-button mr-3 px-3 py-1">
          {open ? `x` : '+'}
        </button>
      </h2>
      {open && (
        <div className="mb-6 px-3">
          <NewRoom callback={toggle} />
        </div>
      )}
      <div className="mb-6 border-b pb-6">
        <RoomsCell />
      </div>
    </>
  );
};

export default RoomsMenu;
