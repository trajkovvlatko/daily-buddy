import type { DeleteCalendarMutationVariables, FindCalendars } from 'types/graphql';

import { Link, routes } from '@redwoodjs/router';
import { useMutation } from '@redwoodjs/web';
import { toast } from '@redwoodjs/web/toast';

import { QUERY } from 'src/components/Calendar/CalendarsCell';
import { truncate } from 'src/lib/formatters';

const DELETE_CALENDAR_MUTATION = gql`
  mutation DeleteCalendarMutation($id: Int!) {
    deleteCalendar(id: $id) {
      id
    }
  }
`;

const CalendarsList = ({ calendars }: FindCalendars) => {
  const [deleteCalendar] = useMutation(DELETE_CALENDAR_MUTATION, {
    onCompleted: () => {
      toast.success('Calendar deleted');
    },
    onError: (error) => {
      toast.error(error.message);
    },
    // This refetches the query on the list page. Read more about other ways to
    // update the cache over here:
    // https://www.apollographql.com/docs/react/data/mutations/#making-all-other-cache-updates
    refetchQueries: [{ query: QUERY }],
    awaitRefetchQueries: true,
  });

  const onDeleteClick = (id: DeleteCalendarMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete calendar ' + id + '?')) {
      deleteCalendar({ variables: { id } });
    }
  };

  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Title</th>
            <th>Color</th>
            <th>Url</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {calendars.map((calendar) => (
            <tr key={calendar.id}>
              <td>{truncate(calendar.id)}</td>
              <td>{truncate(calendar.title)}</td>
              <td>{truncate(calendar.color)}</td>
              <td>{truncate(calendar.url)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.calendar({ id: calendar.id })}
                    title={'Show calendar ' + calendar.id + ' detail'}
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.editCalendar({ id: calendar.id })}
                    title={'Edit calendar ' + calendar.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    title={'Delete calendar ' + calendar.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(calendar.id)}
                  >
                    Delete
                  </button>
                </nav>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CalendarsList;
