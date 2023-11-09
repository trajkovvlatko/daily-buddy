import CallLogCell from 'src/components/CallLog/CallLogCell';

type CallLogPageProps = {
  id: number;
};

const CallLogPage = ({ id, personId }: CallLogPageProps & { personId: number }) => {
  return <CallLogCell id={id} personId={personId} />;
};

export default CallLogPage;
