import { Link, routes, useParams } from '@redwoodjs/router';
import { useMutation } from '@redwoodjs/web';
import { toast } from '@redwoodjs/web/toast';
import { QUERY } from 'src/components/Drawer/DrawersCell';
import { truncate } from 'src/lib/formatters';
import type { DeleteDrawerMutationVariables, FindDrawers } from 'types/graphql';

const DELETE_DRAWER_MUTATION = gql`
  mutation DeleteDrawerMutation($id: Int!) {
    deleteDrawer(id: $id) {
      id
    }
  }
`;

const DrawersList = ({ drawers }: FindDrawers) => {
  const [deleteDrawer] = useMutation(DELETE_DRAWER_MUTATION, {
    onCompleted: () => {
      toast.success('Drawer deleted');
    },
    onError: (error) => {
      toast.error(error.message);
    },
    // This refetches the query on the list page. Read more about other ways to
    // update the cache over here:
    // https://www.apollographql.com/docs/react/data/mutations/#making-all-other-cache-updates
    refetchQueries: [{ query: QUERY }],
    awaitRefetchQueries: true,
  });

  const onDeleteClick = (id: DeleteDrawerMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete drawer ' + id + '?')) {
      deleteDrawer({ variables: { id } });
    }
  };

  const params = useParams();
  const roomId = parseInt(params.roomId);

  return (
    <ul>
      {drawers.map((drawer) => (
        <li key={drawer.id}>
          <Link to={routes.inventoryDrawer({ roomId, storageUnitId: drawer.storageUnitId, drawerId: drawer.id })}>
            {truncate(drawer.level)} -{truncate(drawer.note)}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default DrawersList;