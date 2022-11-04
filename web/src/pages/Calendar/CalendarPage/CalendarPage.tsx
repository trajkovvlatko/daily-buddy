import CalendarCell from 'src/components/Calendar/CalendarCell'

type CalendarPageProps = {
  id: number
}

const CalendarPage = ({ id }: CalendarPageProps) => {
  return <CalendarCell id={id} />
}

export default CalendarPage
