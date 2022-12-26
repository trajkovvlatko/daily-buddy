import EditStorageUnitCell from 'src/components/StorageUnit/EditStorageUnitCell';

type StorageUnitPageProps = {
  id: number;
};

const EditStorageUnitPage = ({ id }: StorageUnitPageProps) => {
  return <EditStorageUnitCell id={id} />;
};

export default EditStorageUnitPage;
