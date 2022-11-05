import EventsCell from '../../components/EventsCell';

const toDateString = (date: Date) => {
  return date.toISOString().slice(0, 10);
};

const DashboardPage = () => {
  const today = new Date();
  const endAt = new Date(today);

  const from = toDateString(today);
  const to = toDateString(new Date(endAt.setDate(today.getDate() + 20)));

  return (
    <div>
      <EventsCell from={from} to={to} />
    </div>
  );
};

export default DashboardPage;
