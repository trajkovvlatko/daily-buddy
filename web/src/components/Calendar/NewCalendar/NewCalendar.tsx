import type { CreateCalendarInput } from 'types/graphql';

import { navigate, routes } from '@redwoodjs/router';
import { useMutation } from '@redwoodjs/web';
import { toast } from '@redwoodjs/web/toast';

import CalendarForm from 'src/components/Calendar/CalendarForm';

const CREATE_CALENDAR_MUTATION = gql`
  mutation CreateCalendarMutation($input: CreateCalendarInput!) {
    createCalendar(input: $input) {
      id
    }
  }
`;

const NewCalendar = () => {
  const [createCalendar, { loading, error }] = useMutation(CREATE_CALENDAR_MUTATION, {
    onCompleted: () => {
      toast.success('Calendar created');
      navigate(routes.calendars());
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onSave = (input: CreateCalendarInput) => {
    createCalendar({ variables: { input } });
  };

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New Calendar</h2>
      </header>
      <div className="rw-segment-main">
        <CalendarForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  );
};

export default NewCalendar;
