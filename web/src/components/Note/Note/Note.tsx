import { marked } from 'marked';
import type { FindNoteById } from 'types/graphql';

import { Link, routes } from '@redwoodjs/router';

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
      <Link to={routes.editNote({ id: note.id })} className="blue-button md:float-right">
        Edit
      </Link>
      <div className="note-markdown">
        <h1 className="mb-6 mt-3 w-full overflow-auto">{note.path}</h1>
        <div dangerouslySetInnerHTML={{ __html: html }}></div>
      </div>
    </>
  );
};

export default Note;
