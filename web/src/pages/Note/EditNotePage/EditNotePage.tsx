import EditNoteCell from 'src/components/Note/EditNoteCell';
import NotesSidebarCell from 'src/components/Note/NotesSidebarCell';
import PageWrapper from 'src/components/PageWrapper/PageWrapper';

type NotePageProps = {
  id: number;
};

const EditNotePage = ({ id }: NotePageProps) => {
  return (
    <PageWrapper>
      <div className="sidebar">
        <NotesSidebarCell />
      </div>
      <div className="main-content">
        <EditNoteCell id={id} />
      </div>
    </PageWrapper>
  );
};

export default EditNotePage;
