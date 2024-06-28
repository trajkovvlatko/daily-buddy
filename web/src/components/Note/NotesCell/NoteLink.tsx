import { NoteReference } from 'types/graphql';

interface Props {
  note: NoteReference;
  onClick: () => void;
  isSelected: boolean;
  shouldPad: boolean;
}

const defaultPadding = 20;

export const NoteLink = ({ note, onClick, isSelected, shouldPad }: Props) => {
  const list = note.path.split('/').filter(Boolean);

  const res = list.reduce(
    (acc, item) => {
      const last = list[list.length - 1];
      return last === item ? { ...acc, label: item } : { count: acc.count + defaultPadding, label: null };
    },
    { count: defaultPadding, label: null }
  );

  return (
    <div
      onClick={onClick}
      className={`w-5/6 cursor-pointer truncate pb-3 pt-3 hover:text-gray-500`}
      style={{
        paddingLeft: shouldPad ? res.count : defaultPadding,
        fontWeight: isSelected ? 'bold' : 'normal',
        backgroundColor: isSelected ? 'rgb(243, 244, 246)' : 'transparent',
      }}
    >
      {res.label}
    </div>
  );
};
