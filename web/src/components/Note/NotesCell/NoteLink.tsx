import { NoteTree } from 'types/graphql';

export const NoteLink = ({ note, onClick }: { note: NoteTree; onClick: () => void }) => {
  const list = note.path.split('/').filter(Boolean);

  const res = list.reduce(
    (acc, item) => {
      const last = list[list.length - 1];
      return last === item ? { ...acc, label: item } : { count: acc.count + 20, label: null };
    },
    { count: 20, label: null }
  );

  return (
    <div
      onClick={onClick}
      className={`cursor-pointer pt-1 pb-1 hover:text-gray-400`}
      style={{ paddingLeft: res.count }}
    >
      {res.label}
    </div>
  );
};
