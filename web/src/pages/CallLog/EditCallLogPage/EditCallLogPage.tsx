import EditCallLogCell from 'src/components/CallLog/EditCallLogCell';

type CallLogPageProps = {
  id: number;
  personId: number;
};

const EditCallLogPage = ({ id, personId }: CallLogPageProps) => {
  return <EditCallLogCell id={id} personId={personId} />;
};

export default EditCallLogPage;
