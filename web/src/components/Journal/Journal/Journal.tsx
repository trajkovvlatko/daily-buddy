import { marked } from 'marked';
import { Link, routes } from '@redwoodjs/router';
import type { FindJournalById } from 'types/graphql';

interface Props {
  journal: NonNullable<FindJournalById['journal']>;
}

const Journal = ({ journal }: Props) => {
  const html = marked.parse(journal.content);

  return (
    <>
      <nav className="float-right">
        <Link to={routes.editJournal({ id: journal.id })} className="rw-button rw-button-blue">
          Edit
        </Link>
      </nav>
      <div>
        <div className="mb-10 mt-1">
          Journal for: <span className="font-semibold">{journal.forDate.slice(0, 10)}</span>
        </div>
        <div className="note-markdown">
          <div dangerouslySetInnerHTML={{ __html: html }}></div>
        </div>
      </div>
    </>
  );
};

export default Journal;
