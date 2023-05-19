import type { FindItems } from 'types/graphql';

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web';

import Items from 'src/components/Item/Items';

export const QUERY = gql`
  query FindItems($drawerId: Int!) {
    items(drawerId: $drawerId) {
      id
      name
      drawerId
      colorId
      itemTypeId
    }
  }
`;

export const Loading = () => <div>Loading...</div>;

export const Empty = () => null;

export const Failure = ({ error }: CellFailureProps) => <div className="rw-cell-error">{error?.message}</div>;

export const Success = ({ items }: CellSuccessProps<FindItems>) => {
  return <Items items={items} />;
};
