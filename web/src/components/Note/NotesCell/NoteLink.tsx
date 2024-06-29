import { NoteReference } from 'types/graphql';

import { Link, routes } from '@redwoodjs/router';

interface Props {
  note: NoteReference;
  shouldPad: boolean;
}

const defaultPadding = 20;

export const NoteLink = ({ note, shouldPad }: Props) => {
  const list = note.path.split('/').filter(Boolean);

  const res = list.reduce(
    (acc, item) => {
      const last = list[list.length - 1];
      return last === item ? { ...acc, label: item } : { count: acc.count + defaultPadding, label: null };
    },
    { count: defaultPadding, label: null }
  );

  return (
    <Link
      to={routes.note({ id: note.id })}
      className={`w-5/6 cursor-pointer truncate pb-3 pt-3 hover:text-gray-500`}
      style={{
        paddingLeft: shouldPad ? res.count : defaultPadding,
      }}
    >
      {res.label}
    </Link>
  );
};
