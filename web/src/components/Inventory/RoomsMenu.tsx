import { useState } from 'react';
import NewRoom from '../Room/NewRoom';
import RoomsCell from '../Room/RoomsCell';

const RoomsMenu = () => {
  const [open, setOpen] = useState(false);
  const toggle = () => setOpen(!open);

  return (
    <>
      <h2 className="h2">Rooms</h2>
      <div className="mb-6 border-b px-3 pb-6">
        <RoomsCell />
      </div>
      <div className="mb-6">
        <button onClick={toggle}>{open ? 'Close' : 'Add new room'}</button>
      </div>
      {open && (
        <div className="mb-6 px-3">
          <NewRoom callback={toggle} />
        </div>
      )}
    </>
  );
};

export default RoomsMenu;
