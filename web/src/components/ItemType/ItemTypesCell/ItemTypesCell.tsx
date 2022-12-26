import type { FindItemTypes } from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import ItemTypes from 'src/components/ItemType/ItemTypes'

export const QUERY = gql`
  query FindItemTypes {
    itemTypes {
      id
      itemType
      createdAt
      userId
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No itemTypes yet. '}
      <Link
        to={routes.newItemType()}
        className="rw-link"
      >
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ itemTypes }: CellSuccessProps<FindItemTypes>) => {
  return <ItemTypes itemTypes={itemTypes} />
}
