import EditNoteCell from 'src/components/Note/EditNoteCell';

type NotePageProps = {
  id: number;
};

const EditNotePage = ({ id }: NotePageProps) => {
  return <EditNoteCell id={id} />;
};

export default EditNotePage;
