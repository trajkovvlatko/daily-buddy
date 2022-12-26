import InventoryMenu from 'src/components/Inventory/InventoryMenu';
import PageWrapper from 'src/components/PageWrapper/PageWrapper';

interface Props {
  roomId?: number;
  storageUnitId?: number;
  drawerId?: number;
}

const InventoryPage = ({ roomId, storageUnitId, drawerId }: Props) => {
  return (
    <PageWrapper>
      <InventoryMenu roomId={roomId} storageUnitId={storageUnitId} drawerId={drawerId} />
    </PageWrapper>
  );
};

export default InventoryPage;
