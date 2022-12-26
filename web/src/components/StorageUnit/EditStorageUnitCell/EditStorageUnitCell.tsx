import type { EditStorageUnitById, UpdateStorageUnitInput } from 'types/graphql'

import { navigate, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import StorageUnitForm from 'src/components/StorageUnit/StorageUnitForm'

export const QUERY = gql`
  query EditStorageUnitById($id: Int!) {
    storageUnit: storageUnit(id: $id) {
      id
      name
      createdAt
      roomId
      userId
    }
  }
`
const UPDATE_STORAGE_UNIT_MUTATION = gql`
  mutation UpdateStorageUnitMutation($id: Int!, $input: UpdateStorageUnitInput!) {
    updateStorageUnit(id: $id, input: $input) {
      id
      name
      createdAt
      roomId
      userId
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ storageUnit }: CellSuccessProps<EditStorageUnitById>) => {
  const [updateStorageUnit, { loading, error }] = useMutation(
    UPDATE_STORAGE_UNIT_MUTATION,
    {
      onCompleted: () => {
        toast.success('StorageUnit updated')
        navigate(routes.storageUnits())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (
    input: UpdateStorageUnitInput,
    id: EditStorageUnitById['storageUnit']['id']
  ) => {
    updateStorageUnit({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">Edit StorageUnit {storageUnit?.id}</h2>
      </header>
      <div className="rw-segment-main">
        <StorageUnitForm storageUnit={storageUnit} onSave={onSave} error={error} loading={loading} />
      </div>
    </div>
  )
}
