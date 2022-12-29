import { useState } from 'react';
import ItemsCell from '../Item/ItemsCell';
import NewItem from '../Item/NewItem';

const ItemsMenu = ({ drawerId }: { drawerId: number }) => {
  const [open, setOpen] = useState(false);
  const toggle = () => setOpen(!open);

  return (
    <>
      <h2 className="h2">Items</h2>
      <div className="mb-6 border-b px-3 pb-6">
        <ItemsCell drawerId={drawerId} />
      </div>
      <div className="mb-6">
        <button onClick={toggle}>{open ? 'Close' : 'Add new item'}</button>
      </div>
      {open && (
        <div className="mb-6 px-3">
          <NewItem drawerId={drawerId} callback={toggle} />
        </div>
      )}
    </>
  );
};

export default ItemsMenu;
