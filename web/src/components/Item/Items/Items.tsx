import { Link, routes, useParams } from '@redwoodjs/router';
import { truncate } from 'src/lib/formatters';
import type { FindItems } from 'types/graphql';

const ItemsList = ({ items }: FindItems) => {
  const params = useParams();
  const roomId = parseInt(params.roomId);
  const storageUnitId = parseInt(params.storageUnitId);

  return (
    <ul>
      {items.map((item) => {
        const active = location.pathname.includes(`/items/${item.id}`) ? 'bg-gray-100' : '';

        return (
          <li key={item.id}>
            <div className={`block cursor-pointer border-t-2 border-t-gray-100 ${active}`}>
              <Link
                to={routes.inventoryItem({ roomId, storageUnitId, drawerId: item.drawerId, itemId: item.id })}
                className="block py-4 pl-5 text-sm"
              >
                {truncate(item.name)}
              </Link>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default ItemsList;
