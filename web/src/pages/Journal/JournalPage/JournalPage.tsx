import JournalCell from 'src/components/Journal/JournalCell';
import JournalSidebarCell from 'src/components/Journal/JournalSidebarCell';
import PageWrapper from 'src/components/PageWrapper/PageWrapper';

type JournalPageProps = {
  id: number;
};

const JournalPage = ({ id }: JournalPageProps) => {
  return (
    <PageWrapper>
      <div className="sidebar">
        <JournalSidebarCell />
      </div>
      <div className="main-content">
        <JournalCell id={id} />
      </div>
    </PageWrapper>
  );
};

export default JournalPage;
