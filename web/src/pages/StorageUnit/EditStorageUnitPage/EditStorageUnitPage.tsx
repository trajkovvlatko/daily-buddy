import PageWrapper from 'src/components/PageWrapper/PageWrapper';
import EditStorageUnitCell from 'src/components/StorageUnit/EditStorageUnitCell';

type StorageUnitPageProps = {
  id: number;
};

const EditStorageUnitPage = ({ id }: StorageUnitPageProps) => {
  return (
    <PageWrapper>
      <div className="col-span-12">
        <EditStorageUnitCell id={id} />;
      </div>
    </PageWrapper>
  );
};

export default EditStorageUnitPage;
