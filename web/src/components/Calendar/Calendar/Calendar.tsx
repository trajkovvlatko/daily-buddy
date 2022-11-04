
import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { timeTag,  } from 'src/lib/formatters'

import type { DeleteCalendarMutationVariables, FindCalendarById } from 'types/graphql'

const DELETE_CALENDAR_MUTATION = gql`
  mutation DeleteCalendarMutation($id: Int!) {
    deleteCalendar(id: $id) {
      id
    }
  }
`

interface Props {
  calendar: NonNullable<FindCalendarById['calendar']>
}

const Calendar = ({ calendar }: Props) => {
  const [deleteCalendar] = useMutation(DELETE_CALENDAR_MUTATION, {
    onCompleted: () => {
      toast.success('Calendar deleted')
      navigate(routes.calendars())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteClick = (id: DeleteCalendarMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete calendar ' + id + '?')) {
      deleteCalendar({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            Calendar {calendar.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{calendar.id}</td>
            </tr><tr>
              <th>Title</th>
              <td>{calendar.title}</td>
            </tr><tr>
              <th>Color</th>
              <td>{calendar.color}</td>
            </tr><tr>
              <th>Url</th>
              <td>{calendar.url}</td>
            </tr><tr>
              <th>Created at</th>
              <td>{timeTag(calendar.createdAt)}</td>
            </tr><tr>
              <th>User id</th>
              <td>{calendar.userId}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editCalendar({ id: calendar.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(calendar.id)}
        >
          Delete
        </button>
      </nav>
    </>
  )
}

export default Calendar
