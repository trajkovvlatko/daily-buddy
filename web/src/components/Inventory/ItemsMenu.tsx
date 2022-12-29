import { navigate, routes, useParams } from '@redwoodjs/router';
import ItemsCell from '../Item/ItemsCell';

const ItemsMenu = ({ drawerId }: { drawerId: number }) => {
  const params = useParams();
  const roomId = parseInt(params.roomId);
  const storageUnitId = parseInt(params.storageUnitId);
  const newItemPath = routes.inventoryNewItem({ roomId, storageUnitId, drawerId });

  return (
    <>
      <h2 className="h2">Items</h2>
      <div className="mb-6 border-b px-3 pb-6">
        <ItemsCell drawerId={drawerId} />
      </div>
      <div className="mb-6">
        <button onClick={() => navigate(newItemPath)}>Add new item</button>
      </div>
    </>
  );
};

export default ItemsMenu;
