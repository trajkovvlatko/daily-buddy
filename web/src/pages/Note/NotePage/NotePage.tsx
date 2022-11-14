import NoteCell from 'src/components/Note/NoteCell';

type NotePageProps = {
  id: number;
};

const NotePage = ({ id }: NotePageProps) => {
  return <NoteCell id={id} />;
};

export default NotePage;
