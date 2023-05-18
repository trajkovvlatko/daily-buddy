import { Link, routes } from '@redwoodjs/router';

import ItemTypesCell from 'src/components/ItemType/ItemTypesCell';

const ItemTypesPage = () => {
  return (
    <div>
      <Link to={routes.newItemType()} className="rw-button rw-button-green float-right mb-6 w-64">
        <div className="rw-button-icon">+</div> New item type
      </Link>
      <ItemTypesCell />
    </div>
  );
};

export default ItemTypesPage;
