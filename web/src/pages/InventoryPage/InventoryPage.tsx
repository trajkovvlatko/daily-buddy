import DrawersMenu from 'src/components/Inventory/DrawersMenu';
import ItemsMenu from 'src/components/Inventory/ItemsMenu';
import RoomsMenu from 'src/components/Inventory/RoomsMenu';
import StorageUnitsMenu from 'src/components/Inventory/StorageUnitsMenu';
import ItemCell from 'src/components/Item/ItemCell';
import NewItem from 'src/components/Item/NewItem';
import PageWrapper from 'src/components/PageWrapper/PageWrapper';

interface Props {
  roomId?: number;
  storageUnitId?: number;
  drawerId?: number;
  itemId?: number;
}

const InventoryPage = ({ roomId, storageUnitId, drawerId, itemId }: Props) => {
  return (
    <PageWrapper>
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
          <ItemsMenu drawerId={drawerId} />
        </div>
      )}
      {roomId && storageUnitId && drawerId && itemId && (
        <div className="h-100 col-span-4 border-r">
          <ItemCell id={itemId} />
        </div>
      )}
      {roomId && storageUnitId && drawerId && !itemId && (
        <div className="h-100 col-span-4 border-r">
          <NewItem drawerId={drawerId} callback={() => {}} />
        </div>
      )}
    </PageWrapper>
  );
};

export default InventoryPage;
