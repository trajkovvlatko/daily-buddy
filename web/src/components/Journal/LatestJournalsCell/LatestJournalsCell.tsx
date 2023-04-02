import type { LatestJournals, LatestJournalsVariables } from 'types/graphql';

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web';

export const QUERY = gql`
  query LatestJournals($limit: Int, $order: Order) {
    journals(limit: $limit, order: $order) {
      id
      forDate
      content
    }
  }
`;

export const beforeQuery = ({
  limit,
  order,
}: {
  limit: number;
  order: string;
}): GraphQLQueryHookOptions<LatestJournals, LatestJournalsVariables> => {
  return {
    variables: {
      limit,
      order: order as any,
    },
  };
};

export const Loading = () => <div>Loading...</div>;

export const Empty = () => null;

export const Failure = ({ error }: CellFailureProps) => <div className="rw-cell-error">{error?.message}</div>;

export const Success = ({ journals }: CellSuccessProps<LatestJournals>) => {
  console.log(journals);
  return <></>;
  // return <Journals journals={journals} />;
};
