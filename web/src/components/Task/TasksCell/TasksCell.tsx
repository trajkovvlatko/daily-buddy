import type { FindTasks } from 'types/graphql';

import { Link, routes } from '@redwoodjs/router';
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web';

import Tasks from 'src/components/Task/Tasks';
import NewTask from '../NewTask';

export const QUERY = gql`
  fragment TaskFields on Task {
    id
    title
    dueDate
    priority
    completed
    completedAt
    createdAt
  }

  query FindTasks {
    tasks {
      todaysAgenda {
        ...TaskFields
      }
      notScheduledYet {
        ...TaskFields
      }
      next {
        ...TaskFields
      }
      doneRecently {
        ...TaskFields
      }
    }
  }
`;

export const Loading = () => <div>Loading...</div>;

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No tasks yet. '}
      <Link to={routes.newTask()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  );
};

export const Failure = ({ error }: CellFailureProps) => <div className="rw-cell-error">{error?.message}</div>;

export const Success = ({ tasks }: CellSuccessProps<FindTasks>) => {
  return (
    <div>
      <h1 className="pb-6">Today's agenda</h1>
      <Tasks tasks={tasks.todaysAgenda} />

      <h1 className="mt-12 pb-6">Not scheduled yet</h1>
      <Tasks tasks={tasks.notScheduledYet} />

      <h1 className="mt-12 pb-6">Next</h1>
      <Tasks tasks={tasks.next} />

      <h1 className="mt-12 pb-6">Done recently</h1>
      <Tasks tasks={tasks.doneRecently} />

      <NewTask />
    </div>
  );
};
