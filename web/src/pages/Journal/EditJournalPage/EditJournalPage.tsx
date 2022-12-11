import EditJournalCell from 'src/components/Journal/EditJournalCell';
import JournalSidebarCell from 'src/components/Journal/JournalSidebarCell';
import PageWrapper from 'src/components/PageWrapper/PageWrapper';

type JournalPageProps = {
  id: number;
};

const EditJournalPage = ({ id }: JournalPageProps) => {
  return (
    <PageWrapper>
      <div className="sidebar">
        <JournalSidebarCell />
      </div>
      <div className="main-content">
        <EditJournalCell id={id} />
      </div>
    </PageWrapper>
  );
};

export default EditJournalPage;
