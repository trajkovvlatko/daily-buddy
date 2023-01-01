import { useState } from 'react';
import NewStorageUnit from '../StorageUnit/NewStorageUnit';
import StorageUnitsCell from '../StorageUnit/StorageUnitsCell';

const StorageUnitsMenu = ({ roomId }: { roomId: number }) => {
  const [open, setOpen] = useState(false);
  const toggle = () => setOpen(!open);

  return (
    <>
      <h2 className="h2 mb-6">
        Storage Units
        <button onClick={toggle} className="green-button mr-3 px-3 py-1">
          {open ? 'x' : '+'}
        </button>
      </h2>
      {open && (
        <div className="mb-6 px-3">
          <NewStorageUnit roomId={roomId} callback={toggle} />
        </div>
      )}
      <div className="mb-6 max-h-[80vh] overflow-y-auto border-b pb-6">
        <StorageUnitsCell roomId={roomId} />
      </div>
    </>
  );
};

export default StorageUnitsMenu;
