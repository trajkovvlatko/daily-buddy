import { useState } from 'react';
import NewStorageUnit from '../StorageUnit/NewStorageUnit';
import StorageUnitsCell from '../StorageUnit/StorageUnitsCell';

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

export default StorageUnitsMenu;
