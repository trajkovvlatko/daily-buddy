import { marked } from 'marked';
import { navigate, routes } from '@redwoodjs/router';
import type { FindJournalById } from 'types/graphql';

interface Props {
  journal: NonNullable<FindJournalById['journal']>;
  onEditCallback?: () => void;
}

const Journal = ({ journal, onEditCallback }: Props) => {
  const html = marked.parse(journal.content);

  const onEdit = () => {
    if (onEditCallback) {
      onEditCallback();
      return;
    }

    navigate(routes.editJournal({ id: journal.id }));
  };

  return (
    <div className="mb-6">
      <nav className="float-right">
        <button onClick={onEdit} className="blue-button">
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
