import type { FindRoomById } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import Room from 'src/components/Room/Room'

export const QUERY = gql`
  query FindRoomById($id: Int!) {
    room: room(id: $id) {
      id
      name
      createdAt
      userId
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Room not found</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ room }: CellSuccessProps<FindRoomById>) => {
  return <Room room={room} />
}
