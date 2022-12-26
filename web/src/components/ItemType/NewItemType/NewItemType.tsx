import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import ItemTypeForm from 'src/components/ItemType/ItemTypeForm'

import type { CreateItemTypeInput } from 'types/graphql'

const CREATE_ITEM_TYPE_MUTATION = gql`
  mutation CreateItemTypeMutation($input: CreateItemTypeInput!) {
    createItemType(input: $input) {
      id
    }
  }
`

const NewItemType = () => {
  const [createItemType, { loading, error }] = useMutation(
    CREATE_ITEM_TYPE_MUTATION,
    {
      onCompleted: () => {
        toast.success('ItemType created')
        navigate(routes.itemTypes())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input: CreateItemTypeInput) => {
    createItemType({ variables: { input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New ItemType</h2>
      </header>
      <div className="rw-segment-main">
        <ItemTypeForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewItemType
