import { marked } from 'marked';
import { navigate, routes } from '@redwoodjs/router';
import type { FindJournalById } from 'types/graphql';

interface Props {
  journal: NonNullable<FindJournalById['journal']>;
}

const Journal = ({ journal }: Props) => {
  const html = marked.parse(journal.content);

  return (
    <div className="mb-6">
      <nav className="float-right">
        <button onClick={() => navigate(routes.editJournal({ id: journal.id }))} className="blue-button">
          Edit
        </button>
      </nav>
      <div>
        <h1 className="mb-10 mt-1 text-lg font-semibold">Journal {journal.forDate.slice(0, 10)}</h1>
        <div className="note-markdown">
          <div dangerouslySetInnerHTML={{ __html: html }}></div>
        </div>
      </div>
    </div>
  );
};

export default Journal;
