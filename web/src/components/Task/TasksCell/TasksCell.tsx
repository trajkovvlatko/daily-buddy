import type { FindTasks } from 'types/graphql';
import { Link, routes } from '@redwoodjs/router';
import { CellSuccessProps, CellFailureProps, useMutation } from '@redwoodjs/web';
import { toast } from '@redwoodjs/web/toast';
import Tasks from 'src/components/Task/Tasks';
import NewTask from '../NewTask';
import { useState } from 'react';

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

const DELETE_ALL_DONE = gql`
  mutation DeleteAllDoneTasks {
    deleteAllDone
  }
`;

export const Loading = () => <div className="loading pb-6">Loading...</div>;

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

export const Success = ({ tasks, refetch }: CellSuccessProps<FindTasks>) => {
  const [showNewTask, setShowNewTask] = useState(false);
  const [deleteAllDone] = useMutation(DELETE_ALL_DONE, {
    onCompleted: () => {
      toast.success('Deleted all done tasks.');
    },
    refetchQueries: [{ query: QUERY }],
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const toggleNewTask = () => {
    setShowNewTask((oldValue) => !oldValue);
  };

  const onRefresh = async () => {
    try {
      await refetch();
      toast.success('Tasks ready');
    } catch (e) {
      toast.error('Cannot refresh tasks');
    }
  };

  const onDeleteAllDone = async () => {
    if (confirm('Are you sure you want to delete all done tasks?')) {
      deleteAllDone();
    }
  };

  const hasTodaysAgenda = tasks.todaysAgenda.length > 0;
  const hasNotScheduled = tasks.notScheduledYet.length > 0;

  return (
    <div>
      <button className="green-button float-right mb-6" onClick={toggleNewTask}>
        {showNewTask ? 'Close' : 'New task'}
      </button>

      {showNewTask && (
        <div className="mb-12">
          <h1 className="pb-6">New Task</h1>
          <NewTask />
        </div>
      )}

      {hasTodaysAgenda && (
        <div className="mb-12">
          <h1 className="pb-4 pt-1 text-lg font-semibold">
            Today's tasks
            <span onClick={onRefresh} className="refresh">
              ↻
            </span>
          </h1>
          <Tasks tasks={tasks.todaysAgenda} />
        </div>
      )}

      {hasNotScheduled && (
        <div className="mb-12">
          <h1 className="pb-6 text-red-700">Not scheduled yet</h1>
          <Tasks tasks={tasks.notScheduledYet} />
        </div>
      )}

      {(hasTodaysAgenda || hasNotScheduled) && <div className="h-36"></div>}

      {tasks.next.length > 0 && (
        <div className="mb-12">
          <h1 className="pb-6">Next</h1>
          <Tasks tasks={tasks.next} />
        </div>
      )}

      {tasks.doneRecently.length > 0 && (
        <div className="mb-12">
          <h1 className="pb-6">Done recently</h1>
          <div className="mb-6">
            <Tasks tasks={tasks.doneRecently} />
          </div>
          <button onClick={onDeleteAllDone} className="red-button float-right mb-6">
            Delete all done
          </button>
        </div>
      )}
    </div>
  );
};
