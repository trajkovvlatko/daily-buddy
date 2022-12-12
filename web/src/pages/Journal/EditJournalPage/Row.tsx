import { Link, routes, useLocation } from '@redwoodjs/router';

export const Row = ({ journal }: { journal: { id: number; forDate: string } }) => {
  const location = useLocation();
  const active = location.pathname === `/journals/${journal.id}/edit` ? 'bg-gray-100' : '';

  return (
    <div className={`block cursor-pointer border-t-2 border-t-gray-100 py-4 px-3 ${active}`}>
      <Link
        to={routes.editJournal({ id: journal.id })}
        title={'Show journal ' + journal.id + ' detail'}
        className="block text-sm"
      >
        {journal.forDate.slice(0, 10)}
      </Link>
    </div>
  );
};
