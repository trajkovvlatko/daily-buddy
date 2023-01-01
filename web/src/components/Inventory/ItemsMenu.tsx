import { navigate, routes, useParams } from '@redwoodjs/router';
import ItemsCell from '../Item/ItemsCell';

const ItemsMenu = ({ drawerId }: { drawerId: number }) => {
  const params = useParams();
  const roomId = parseInt(params.roomId);
  const storageUnitId = parseInt(params.storageUnitId);
  const newItemPath = routes.inventoryNewItem({ roomId, storageUnitId, drawerId });

  return (
    <>
      <h2 className="h2 mb-6">
        Items
        <button onClick={() => navigate(newItemPath)} className="green-button mr-3 px-3 py-1">
          +
        </button>
      </h2>
      <div className="mb-6 max-h-[80vh] overflow-y-auto border-b pb-6">
        <ItemsCell drawerId={drawerId} />
      </div>
    </>
  );
};

export default ItemsMenu;
