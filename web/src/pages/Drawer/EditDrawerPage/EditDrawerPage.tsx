import EditDrawerCell from 'src/components/Drawer/EditDrawerCell';
import PageWrapper from 'src/components/PageWrapper/PageWrapper';

type DrawerPageProps = {
  id: number;
};

const EditDrawerPage = ({ id }: DrawerPageProps) => {
  return (
    <PageWrapper>
      <div className="col-span-12">
        <EditDrawerCell id={id} />;
      </div>
    </PageWrapper>
  );
};

export default EditDrawerPage;
