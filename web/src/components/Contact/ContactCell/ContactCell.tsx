import { Contact } from 'types/graphql';

import { Link, routes } from '@redwoodjs/router';
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web';

export const QUERY = gql`
  query Contact {
    contact {
      id
      name
    }
  }
`;

export const Loading = () => <div className="loading pb-6">Loading...</div>;

export const Empty = () => <div>Empty</div>;

export const Failure = ({ error }: CellFailureProps) => <div style={{ color: 'red' }}>Error: {error?.message}</div>;

export const Success = (props: CellSuccessProps<Contact>) => {
  const { contact } = props;

  return (
    <div className="mb-3 bg-white p-3 shadow-lg" key={`contact-${contact.id}`}>
      <div className="flex items-center justify-between">
        <div>
          Contact: <span className="font-bold">{contact.name}</span>
        </div>
        <Link to={routes.newCallLog({ personId: contact.id })} className="orange-button">
          Add call log
        </Link>
      </div>
    </div>
  );
};
