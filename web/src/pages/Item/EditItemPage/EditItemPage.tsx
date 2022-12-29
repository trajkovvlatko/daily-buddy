import EditItemCell from 'src/components/Item/EditItemCell';
import PageWrapper from 'src/components/PageWrapper/PageWrapper';

type ItemPageProps = {
  id: number;
};

const EditItemPage = ({ id }: ItemPageProps) => {
  return (
    <PageWrapper>
      <div className="main-content">
        <EditItemCell id={id} />
      </div>
    </PageWrapper>
  );
};

export default EditItemPage;
