import type { FindDrawers } from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import Drawers from 'src/components/Drawer/Drawers'

export const QUERY = gql`
  query FindDrawers {
    drawers {
      id
      level
      note
      createdAt
      storageUnitId
      userId
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No drawers yet. '}
      <Link
        to={routes.newDrawer()}
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

export const Success = ({ drawers }: CellSuccessProps<FindDrawers>) => {
  return <Drawers drawers={drawers} />
}
