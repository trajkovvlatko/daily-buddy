import RoomCell from 'src/components/Room/RoomCell'

type RoomPageProps = {
  id: number
}

const RoomPage = ({ id }: RoomPageProps) => {
  return <RoomCell id={id} />
}

export default RoomPage
