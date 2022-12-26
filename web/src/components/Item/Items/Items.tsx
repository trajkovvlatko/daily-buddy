import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/Item/ItemsCell'
import { timeTag, truncate } from 'src/lib/formatters'

import type { DeleteItemMutationVariables, FindItems } from 'types/graphql'

const DELETE_ITEM_MUTATION = gql`
  mutation DeleteItemMutation($id: Int!) {
    deleteItem(id: $id) {
      id
    }
  }
`

const ItemsList = ({ items }: FindItems) => {
  const [deleteItem] = useMutation(DELETE_ITEM_MUTATION, {
    onCompleted: () => {
      toast.success('Item deleted')
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

  const onDeleteClick = (id: DeleteItemMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete item ' + id + '?')) {
      deleteItem({ variables: { id } })
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
            <th>Drawer id</th>
            <th>User id</th>
            <th>Color id</th>
            <th>Item type id</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <td>{truncate(item.id)}</td>
              <td>{truncate(item.name)}</td>
              <td>{timeTag(item.createdAt)}</td>
              <td>{truncate(item.drawerId)}</td>
              <td>{truncate(item.userId)}</td>
              <td>{truncate(item.colorId)}</td>
              <td>{truncate(item.itemTypeId)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.item({ id: item.id })}
                    title={'Show item ' + item.id + ' detail'}
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.editItem({ id: item.id })}
                    title={'Edit item ' + item.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    title={'Delete item ' + item.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(item.id)}
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

export default ItemsList
