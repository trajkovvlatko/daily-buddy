import { marked } from 'marked';
import type { FindNoteById } from 'types/graphql';

interface Props {
  note: NonNullable<FindNoteById['note']>;
}

const Note = ({ note }: Props) => {
  return (
    <>
      <div className="note-markdown overflow-y-auto">
        <h1 className="mb-6 mt-3 w-full overflow-auto">{note.path}</h1>
        <div dangerouslySetInnerHTML={{ __html: marked.parse(note.content) }}></div>
      </div>
    </>
  );
};

export default Note;
