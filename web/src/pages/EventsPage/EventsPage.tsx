import EventsCell from '../../components/EventsCell';

const toDateString = (date: Date) => {
  return date.toISOString().slice(0, 10);
};

const EventsPage = () => {
  const today = new Date();
  const endAt = new Date(today);

  const from = toDateString(today);
  const to = toDateString(new Date(endAt.setDate(today.getDate() + 20)));
  console.log(from, to);

  return (
    <>
      <h1>Events</h1>

      <EventsCell from={from} to={to} />
    </>
  );
};

export default EventsPage;
