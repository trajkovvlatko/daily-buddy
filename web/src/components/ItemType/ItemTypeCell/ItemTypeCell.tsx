import type { FindItemTypeById } from 'types/graphql';

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web';

import ItemType from 'src/components/ItemType/ItemType';

export const QUERY = gql`
  query FindItemTypeById($id: Int!) {
    itemType: itemType(id: $id) {
      id
      itemType
    }
  }
`;

export const Loading = () => <div>Loading...</div>;

export const Empty = () => <div>ItemType not found</div>;

export const Failure = ({ error }: CellFailureProps) => <div className="rw-cell-error">{error?.message}</div>;

export const Success = ({ itemType }: CellSuccessProps<FindItemTypeById>) => {
  return <ItemType itemType={itemType} />;
};
