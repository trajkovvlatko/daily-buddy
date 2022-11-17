import { marked } from 'marked';
import type { FindNoteById } from 'types/graphql';

interface Props {
  note: NonNullable<FindNoteById['note']>;
}

const Note = ({ note }: Props) => {
  return (
    <>
      <div>
        <h2 className="text-2xl">{note.title}</h2>
        <div dangerouslySetInnerHTML={{ __html: marked.parse(note.content) }}></div>
      </div>
    </>
  );
};

export default Note;
