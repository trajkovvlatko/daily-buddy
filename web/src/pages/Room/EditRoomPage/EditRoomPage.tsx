import EditRoomCell from 'src/components/Room/EditRoomCell';

type RoomPageProps = {
  id: number;
};

const EditRoomPage = ({ id }: RoomPageProps) => {
  return <EditRoomCell id={id} />;
};

export default EditRoomPage;
