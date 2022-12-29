import { useState } from 'react';
import DrawersCell from '../Drawer/DrawersCell';
import NewDrawer from '../Drawer/NewDrawer';

const DrawersMenu = ({ storageUnitId }: { storageUnitId: number }) => {
  const [open, setOpen] = useState(false);
  const toggle = () => setOpen(!open);

  return (
    <>
      <h2 className="h2">Drawers</h2>
      <div className="mb-6 border-b px-3 pb-6">
        <DrawersCell storageUnitId={storageUnitId} />
      </div>
      <div className="mb-6">
        <button onClick={toggle}>{open ? 'Close' : 'Add new drawer'}</button>
      </div>
      {open && (
        <div className="mb-6 px-3">
          <NewDrawer storageUnitId={storageUnitId} callback={toggle} />
        </div>
      )}
    </>
  );
};

export default DrawersMenu;
