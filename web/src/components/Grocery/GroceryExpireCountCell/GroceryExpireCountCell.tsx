import { TrashIcon } from '@heroicons/react/24/outline';

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web';

export const QUERY = gql`
  query GroceriesExpireCount {
    groceriesExpireCount
  }
`;

export const Loading = () => <TrashIcon className={`header-icon text-blue-500 hover:text-blue-800`} />;

export const Empty = () => <></>;

export const Failure = ({ error }: CellFailureProps) => {
  console.log(error);
  return <></>;
};

export const Success = ({ groceriesExpireCount }: CellSuccessProps) => {
  const classNames = groceriesExpireCount > 0 ? 'text-red-500 hover:text-red-800' : 'text-blue-500 hover:text-blue-800';

  return (
    <>
      <TrashIcon className={`header-icon ${classNames}`} />
    </>
  );
};
