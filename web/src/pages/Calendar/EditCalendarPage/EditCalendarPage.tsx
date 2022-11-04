import EditCalendarCell from 'src/components/Calendar/EditCalendarCell'

type CalendarPageProps = {
  id: number
}

const EditCalendarPage = ({ id }: CalendarPageProps) => {
  return <EditCalendarCell id={id} />
}

export default EditCalendarPage
