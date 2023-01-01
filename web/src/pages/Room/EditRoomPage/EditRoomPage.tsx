import PageWrapper from 'src/components/PageWrapper/PageWrapper';
import EditRoomCell from 'src/components/Room/EditRoomCell';

type RoomPageProps = {
  id: number;
};

const EditRoomPage = ({ id }: RoomPageProps) => {
  return (
    <PageWrapper>
      <div className="col-span-12">
        <EditRoomCell id={id} />
      </div>
    </PageWrapper>
  );
};

export default EditRoomPage;
