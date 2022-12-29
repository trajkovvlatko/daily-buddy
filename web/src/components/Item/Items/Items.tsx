import { Link, routes, useParams } from '@redwoodjs/router';
import { truncate } from 'src/lib/formatters';
import type { FindItems } from 'types/graphql';

const ItemsList = ({ items }: FindItems) => {
  const params = useParams();
  const roomId = parseInt(params.roomId);
  const storageUnitId = parseInt(params.storageUnitId);

  return (
    <ul>
      {items.map((item) => (
        <li key={item.id}>
          <div>
            <Link to={routes.inventoryItem({ roomId, storageUnitId, drawerId: item.drawerId, itemId: item.id })}>
              {truncate(item.name)}
            </Link>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default ItemsList;
