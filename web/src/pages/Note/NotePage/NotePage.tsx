import NoteCell from 'src/components/Note/NoteCell';
import NotesSidebarCell from 'src/components/Note/NotesSidebarCell';
import PageWrapper from 'src/components/PageWrapper/PageWrapper';

type NotePageProps = {
  id: number;
};

const NotePage = ({ id }: NotePageProps) => {
  return (
    <PageWrapper>
      <div className="sidebar">
        <NotesSidebarCell />
      </div>
      <div className="main-content">
        <NoteCell id={id} />
      </div>
    </PageWrapper>
  );
};

export default NotePage;
