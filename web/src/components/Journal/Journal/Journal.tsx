import { Link, routes } from '@redwoodjs/router';
import MDEditor from '@uiw/react-md-editor';
import type { FindJournalById } from 'types/graphql';

interface Props {
  journal: NonNullable<FindJournalById['journal']>;
}

const Journal = ({ journal }: Props) => {
  return (
    <>
      <nav className="rw-button-group float-right">
        <Link to={routes.editJournal({ id: journal.id })} className="rw-button rw-button-blue">
          Edit
        </Link>
      </nav>
      <div>
        <div className="mb-10 mt-1">
          Journal for: <span className="font-semibold">{journal.forDate.slice(0, 10)}</span>
        </div>
        <div className="note-markdown">
          <MDEditor.Markdown source={journal.content} />
        </div>
      </div>
    </>
  );
};

export default Journal;
