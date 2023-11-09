import NewCallLog from 'src/components/CallLog/NewCallLog';

const NewCallLogPage = ({ personId }: { personId: number }) => {
  return <NewCallLog personId={personId} />;
};

export default NewCallLogPage;
