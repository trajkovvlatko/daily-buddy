import type { EditCalendarById, UpdateCalendarInput } from 'types/graphql'

import { navigate, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import CalendarForm from 'src/components/Calendar/CalendarForm'

export const QUERY = gql`
  query EditCalendarById($id: Int!) {
    calendar: calendar(id: $id) {
      id
      title
      color
      url
      createdAt
      userId
    }
  }
`
const UPDATE_CALENDAR_MUTATION = gql`
  mutation UpdateCalendarMutation($id: Int!, $input: UpdateCalendarInput!) {
    updateCalendar(id: $id, input: $input) {
      id
      title
      color
      url
      createdAt
      userId
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ calendar }: CellSuccessProps<EditCalendarById>) => {
  const [updateCalendar, { loading, error }] = useMutation(
    UPDATE_CALENDAR_MUTATION,
    {
      onCompleted: () => {
        toast.success('Calendar updated')
        navigate(routes.calendars())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (
    input: UpdateCalendarInput,
    id: EditCalendarById['calendar']['id']
  ) => {
    updateCalendar({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">Edit Calendar {calendar?.id}</h2>
      </header>
      <div className="rw-segment-main">
        <CalendarForm calendar={calendar} onSave={onSave} error={error} loading={loading} />
      </div>
    </div>
  )
}
