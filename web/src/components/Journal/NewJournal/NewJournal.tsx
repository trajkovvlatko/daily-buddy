import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import JournalForm from 'src/components/Journal/JournalForm'

import type { CreateJournalInput } from 'types/graphql'

const CREATE_JOURNAL_MUTATION = gql`
  mutation CreateJournalMutation($input: CreateJournalInput!) {
    createJournal(input: $input) {
      id
    }
  }
`

const NewJournal = () => {
  const [createJournal, { loading, error }] = useMutation(
    CREATE_JOURNAL_MUTATION,
    {
      onCompleted: () => {
        toast.success('Journal created')
        navigate(routes.journals())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input: CreateJournalInput) => {
    createJournal({ variables: { input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New Journal</h2>
      </header>
      <div className="rw-segment-main">
        <JournalForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewJournal
