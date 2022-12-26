import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/StorageUnit/StorageUnitsCell'
import { timeTag, truncate } from 'src/lib/formatters'

import type { DeleteStorageUnitMutationVariables, FindStorageUnits } from 'types/graphql'

const DELETE_STORAGE_UNIT_MUTATION = gql`
  mutation DeleteStorageUnitMutation($id: Int!) {
    deleteStorageUnit(id: $id) {
      id
    }
  }
`

const StorageUnitsList = ({ storageUnits }: FindStorageUnits) => {
  const [deleteStorageUnit] = useMutation(DELETE_STORAGE_UNIT_MUTATION, {
    onCompleted: () => {
      toast.success('StorageUnit deleted')
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

  const onDeleteClick = (id: DeleteStorageUnitMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete storageUnit ' + id + '?')) {
      deleteStorageUnit({ variables: { id } })
    }
  }

  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Created at</th>
            <th>Room id</th>
            <th>User id</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {storageUnits.map((storageUnit) => (
            <tr key={storageUnit.id}>
              <td>{truncate(storageUnit.id)}</td>
              <td>{truncate(storageUnit.name)}</td>
              <td>{timeTag(storageUnit.createdAt)}</td>
              <td>{truncate(storageUnit.roomId)}</td>
              <td>{truncate(storageUnit.userId)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.storageUnit({ id: storageUnit.id })}
                    title={'Show storageUnit ' + storageUnit.id + ' detail'}
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.editStorageUnit({ id: storageUnit.id })}
                    title={'Edit storageUnit ' + storageUnit.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    title={'Delete storageUnit ' + storageUnit.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(storageUnit.id)}
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

export default StorageUnitsList
