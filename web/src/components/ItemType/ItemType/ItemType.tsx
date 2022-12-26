
import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { timeTag,  } from 'src/lib/formatters'

import type { DeleteItemTypeMutationVariables, FindItemTypeById } from 'types/graphql'

const DELETE_ITEM_TYPE_MUTATION = gql`
  mutation DeleteItemTypeMutation($id: Int!) {
    deleteItemType(id: $id) {
      id
    }
  }
`

interface Props {
  itemType: NonNullable<FindItemTypeById['itemType']>
}

const ItemType = ({ itemType }: Props) => {
  const [deleteItemType] = useMutation(DELETE_ITEM_TYPE_MUTATION, {
    onCompleted: () => {
      toast.success('ItemType deleted')
      navigate(routes.itemTypes())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteClick = (id: DeleteItemTypeMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete itemType ' + id + '?')) {
      deleteItemType({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            ItemType {itemType.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{itemType.id}</td>
            </tr><tr>
              <th>Item type</th>
              <td>{itemType.itemType}</td>
            </tr><tr>
              <th>Created at</th>
              <td>{timeTag(itemType.createdAt)}</td>
            </tr><tr>
              <th>User id</th>
              <td>{itemType.userId}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editItemType({ id: itemType.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(itemType.id)}
        >
          Delete
        </button>
      </nav>
    </>
  )
}

export default ItemType
