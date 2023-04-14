import EditStreakCell from 'src/components/Streak/EditStreakCell'

type StreakPageProps = {
  id: number
}

const EditStreakPage = ({ id }: StreakPageProps) => {
  return <EditStreakCell id={id} />
}

export default EditStreakPage
