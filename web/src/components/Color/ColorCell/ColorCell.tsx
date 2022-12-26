import type { FindColorById } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import Color from 'src/components/Color/Color'

export const QUERY = gql`
  query FindColorById($id: Int!) {
    color: color(id: $id) {
      id
      color
      createdAt
      userId
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Color not found</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ color }: CellSuccessProps<FindColorById>) => {
  return <Color color={color} />
}
