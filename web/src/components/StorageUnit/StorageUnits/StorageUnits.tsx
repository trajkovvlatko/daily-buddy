import type { FindStorageUnits } from 'types/graphql';

import { Link, routes } from '@redwoodjs/router';

import { truncate } from 'src/lib/formatters';

const StorageUnitsList = ({ storageUnits }: FindStorageUnits) => {
  return (
    <ul>
      {storageUnits.map((storageUnit) => {
        const active = location.pathname.includes(`/storage_units/${storageUnit.id}`) ? 'bg-gray-100' : '';

        return (
          <li key={storageUnit.id} className="inventory-menu">
            <div className={`block cursor-pointer border-t-2 border-t-gray-100 ${active} flex justify-between`}>
              <Link
                to={routes.inventoryStorageUnit({ roomId: storageUnit.roomId, storageUnitId: storageUnit.id })}
                className="block w-full py-4 pl-5 text-sm"
              >
                {truncate(storageUnit.name)}
              </Link>
              <Link
                to={routes.editStorageUnit({ id: storageUnit.id })}
                className="edit-link block py-4 pr-5 text-sm md:hidden"
              >
                edit
              </Link>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default StorageUnitsList;
