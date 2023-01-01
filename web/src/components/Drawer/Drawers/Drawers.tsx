import { Link, routes, useParams } from '@redwoodjs/router';
import { truncate } from 'src/lib/formatters';
import type { FindDrawers } from 'types/graphql';

const DrawersList = ({ drawers }: FindDrawers) => {
  const params = useParams();
  const roomId = parseInt(params.roomId);

  return (
    <ul>
      {drawers.map((drawer) => {
        const active = location.pathname.includes(`/drawers/${drawer.id}`) ? 'bg-gray-100' : '';

        return (
          <li key={drawer.id} className="inventory-menu">
            <div className={`block cursor-pointer border-t-2 border-t-gray-100 ${active} flex justify-between`}>
              <Link
                to={routes.inventoryDrawer({ roomId, storageUnitId: drawer.storageUnitId, drawerId: drawer.id })}
                className="block w-full py-4 pl-5 text-sm"
              >
                {truncate(drawer.level)} -{truncate(drawer.note)}
              </Link>
              <Link to={routes.editDrawer({ id: drawer.id })} className="edit-link block py-4 pr-5 text-sm md:hidden">
                edit
              </Link>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default DrawersList;
