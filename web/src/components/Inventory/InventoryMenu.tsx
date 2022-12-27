import { useState } from 'react';
import RoomsCell from 'src/components/Room/RoomsCell';
import DrawersCell from '../Drawer/DrawersCell';
import NewDrawer from '../Drawer/NewDrawer';
import NewRoom from '../Room/NewRoom';
import NewStorageUnit from '../StorageUnit/NewStorageUnit';
import StorageUnitsCell from '../StorageUnit/StorageUnitsCell';

interface Props {
  roomId?: number;
  storageUnitId?: number;
  drawerId?: number;
}

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

const StorageUnitsMenu = ({ roomId }: { roomId: number }) => {
  const [open, setOpen] = useState(false);
  const toggle = () => setOpen(!open);

  return (
    <>
      <h2 className="h2">Storage Units</h2>
      <div className="mb-6 border-b px-3 pb-6">
        <StorageUnitsCell roomId={roomId} />
      </div>
      <div className="mb-6">
        <button onClick={toggle}>{open ? 'Close' : 'Add new storage unit'}</button>
      </div>
      {open && (
        <div className="mb-6 px-3">
          <NewStorageUnit roomId={roomId} callback={toggle} />
        </div>
      )}
    </>
  );
};

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

const InventoryMenu = ({ roomId, storageUnitId, drawerId }: Props) => {
  return (
    <>
      <div className="h-100 col-span-2 border-r">
        <RoomsMenu />
      </div>
      {roomId && (
        <div className="h-100 col-span-2 border-r">
          <StorageUnitsMenu roomId={roomId} />
        </div>
      )}
      {roomId && storageUnitId && (
        <div className="h-100 col-span-2 border-r">
          <DrawersMenu storageUnitId={storageUnitId} />
        </div>
      )}
      {roomId && storageUnitId && drawerId && (
        <div className="h-100 col-span-2 border-r">
          <h2 className="h2">Items</h2>
          drawerId: {drawerId}
        </div>
      )}
    </>
  );
};

export default InventoryMenu;
