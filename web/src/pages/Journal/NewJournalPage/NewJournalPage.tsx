import JournalSidebarCell from 'src/components/Journal/JournalSidebarCell';
import NewJournal from 'src/components/Journal/NewJournal';
import PageWrapper from 'src/components/PageWrapper/PageWrapper';

const NewJournalPage = () => {
  return (
    <PageWrapper>
      <div className="sidebar">
        <JournalSidebarCell />
      </div>
      <div className="main-content">
        <NewJournal />
      </div>
    </PageWrapper>
  );
};

export default NewJournalPage;
