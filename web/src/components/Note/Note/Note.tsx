import { marked } from 'marked';
import type { FindNoteById } from 'types/graphql';

interface Props {
  note: NonNullable<FindNoteById['note']>;
}

marked.setOptions({
  breaks: true,
});

const Note = ({ note }: Props) => {
  const html = marked.parse(note.content);

  return (
    <>
      <div className="note-markdown overflow-y-auto">
        <h1 className="mb-6 mt-3 w-full overflow-auto">{note.path}</h1>
        <div dangerouslySetInnerHTML={{ __html: html }}></div>
      </div>
    </>
  );
};

export default Note;
