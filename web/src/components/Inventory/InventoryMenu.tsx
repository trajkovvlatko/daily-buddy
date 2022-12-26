import RoomsCell from 'src/components/Room/RoomsCell';
import DrawersCell from '../Drawer/DrawersCell';
import StorageUnitsCell from '../StorageUnit/StorageUnitsCell';

interface Props {
  roomId?: number;
  storageUnitId?: number;
  drawerId?: number;
}

const InventoryMenu = ({ roomId, storageUnitId, drawerId }: Props) => {
  return (
    <>
      <div className="h-100 col-span-2 border-r">
        <h2 className="h2">Rooms</h2>
        <RoomsCell />
      </div>
      <div className="h-100 col-span-2 border-r">
        <h2 className="h2">Storage Units</h2>
        {roomId && (
          <>
            roomId: {roomId} - <StorageUnitsCell />
          </>
        )}
      </div>
      <div className="h-100 col-span-2 border-r">
        <h2 className="h2">Drawers</h2>
        {storageUnitId && (
          <>
            storageUnitId: {storageUnitId} - <DrawersCell />
          </>
        )}
      </div>
      {drawerId && <div className="h-100 col-span-2 border-r"> drawerId: {drawerId}</div>}
    </>
  );
};

export default InventoryMenu;
