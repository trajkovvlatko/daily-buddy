import StorageUnitCell from 'src/components/StorageUnit/StorageUnitCell';

type StorageUnitPageProps = {
  id: number;
};

const StorageUnitPage = ({ id }: StorageUnitPageProps) => {
  return <StorageUnitCell id={id} />;
};

export default StorageUnitPage;
