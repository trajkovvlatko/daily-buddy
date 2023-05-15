import { NoteTree } from 'types/graphql';

interface Props {
  note: NoteTree;
  onClick: () => void;
  isSelected: boolean;
}

export const NoteLink = ({ note, onClick, isSelected }: Props) => {
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
      className={`w-52 flex-auto cursor-pointer pt-3 pb-3 hover:text-gray-500`}
      style={{
        paddingLeft: res.count,
        fontWeight: isSelected ? 'bold' : 'normal',
        backgroundColor: isSelected ? 'rgb(243, 244, 246)' : 'transparent',
      }}
    >
      {res.label}
    </div>
  );
};
