import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/Drawer/DrawersCell'
import { timeTag, truncate } from 'src/lib/formatters'

import type { DeleteDrawerMutationVariables, FindDrawers } from 'types/graphql'

const DELETE_DRAWER_MUTATION = gql`
  mutation DeleteDrawerMutation($id: Int!) {
    deleteDrawer(id: $id) {
      id
    }
  }
`

const DrawersList = ({ drawers }: FindDrawers) => {
  const [deleteDrawer] = useMutation(DELETE_DRAWER_MUTATION, {
    onCompleted: () => {
      toast.success('Drawer deleted')
    },
    onError: (error) => {
      toast.error(error.message)
    },
    // This refetches the query on the list page. Read more about other ways to
    // update the cache over here:
    // https://www.apollographql.com/docs/react/data/mutations/#making-all-other-cache-updates
    refetchQueries: [{ query: QUERY }],
    awaitRefetchQueries: true,
  })

  const onDeleteClick = (id: DeleteDrawerMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete drawer ' + id + '?')) {
      deleteDrawer({ variables: { id } })
    }
  }

  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Level</th>
            <th>Note</th>
            <th>Created at</th>
            <th>Storage unit id</th>
            <th>User id</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {drawers.map((drawer) => (
            <tr key={drawer.id}>
              <td>{truncate(drawer.id)}</td>
              <td>{truncate(drawer.level)}</td>
              <td>{truncate(drawer.note)}</td>
              <td>{timeTag(drawer.createdAt)}</td>
              <td>{truncate(drawer.storageUnitId)}</td>
              <td>{truncate(drawer.userId)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.drawer({ id: drawer.id })}
                    title={'Show drawer ' + drawer.id + ' detail'}
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.editDrawer({ id: drawer.id })}
                    title={'Edit drawer ' + drawer.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    title={'Delete drawer ' + drawer.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(drawer.id)}
                  >
                    Delete
                  </button>
                </nav>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default DrawersList
