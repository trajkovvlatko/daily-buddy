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
      {roomId && (
        <div className="h-100 col-span-2 border-r">
          <h2 className="h2">Storage Units</h2>
          <StorageUnitsCell />
        </div>
      )}
      {storageUnitId && (
        <div className="h-100 col-span-2 border-r">
          <h2 className="h2">Drawers</h2>
          <DrawersCell />
        </div>
      )}
      {drawerId && (
        <div className="h-100 col-span-2 border-r">
          <h2 className="h2">Items</h2>
          drawerId: {drawerId}
        </div>
      )}
    </>
  );
};

export default InventoryMenu;
