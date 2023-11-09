import CallLogsCell from 'src/components/CallLog/CallLogsCell';

const CallLogsPage = ({ personId }: { personId: number }) => {
  return <CallLogsCell personId={personId} />;
};

export default CallLogsPage;
