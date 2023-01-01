import { Link, routes } from '@redwoodjs/router';
import { truncate } from 'src/lib/formatters';
import type { FindRooms } from 'types/graphql';

const RoomsList = ({ rooms }: FindRooms) => {
  return (
    <ul>
      {rooms.map((room) => {
        const active = location.pathname.includes(`/rooms/${room.id}`) ? 'bg-gray-100' : '';

        return (
          <li key={room.id} className="inventory-menu">
            <div className={`block cursor-pointer border-t-2 border-t-gray-100 ${active} flex justify-between`}>
              <Link to={routes.inventoryRoom({ roomId: room.id })} className="block py-4 pl-5 text-sm">
                {truncate(room.name)}
              </Link>
              <Link to={routes.editRoom({ id: room.id })} className="edit-link block py-4 pr-5 text-sm md:hidden">
                edit
              </Link>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default RoomsList;
