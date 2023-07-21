import type { FindShoppingLists } from 'types/graphql';

import { Link, routes } from '@redwoodjs/router';
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web';

import ShoppingLists from 'src/components/ShoppingList/ShoppingLists';

export const QUERY = gql`
  query FindShoppingLists {
    shoppingLists {
      id
      name
      shoppingListItems {
        id
        name
      }
    }
  }
`;

export const Loading = () => <div>Loading...</div>;

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No shoppingLists yet. '}
      <Link to={routes.newShoppingList()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  );
};

export const Failure = ({ error }: CellFailureProps) => <div className="rw-cell-error">{error?.message}</div>;

export const Success = ({ shoppingLists }: CellSuccessProps<FindShoppingLists>) => {
  return <ShoppingLists shoppingLists={shoppingLists} />;
};
