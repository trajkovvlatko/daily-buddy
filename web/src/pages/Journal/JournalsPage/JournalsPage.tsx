import JournalSidebarCell from 'src/components/Journal/JournalSidebarCell';
import PageWrapper from 'src/components/PageWrapper/PageWrapper';

const JournalsPage = () => {
  return (
    <PageWrapper>
      <div className="sidebar">
        <JournalSidebarCell />
      </div>
    </PageWrapper>
  );
};

export default JournalsPage;
