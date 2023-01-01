import { useState } from 'react';
import DrawersCell from '../Drawer/DrawersCell';
import NewDrawer from '../Drawer/NewDrawer';

const DrawersMenu = ({ storageUnitId }: { storageUnitId: number }) => {
  const [open, setOpen] = useState(false);
  const toggle = () => setOpen(!open);

  return (
    <>
      <h2 className="h2 mb-6">
        Drawers
        <button onClick={toggle} className="green-button mr-3 px-3 py-1">
          {open ? 'x' : '+'}
        </button>
      </h2>
      {open && (
        <div className="mb-6 px-3">
          <NewDrawer storageUnitId={storageUnitId} callback={toggle} />
        </div>
      )}
      <div className="mb-6 max-h-[80vh] overflow-y-auto border-b pb-6">
        <DrawersCell storageUnitId={storageUnitId} />
      </div>
    </>
  );
};

export default DrawersMenu;
