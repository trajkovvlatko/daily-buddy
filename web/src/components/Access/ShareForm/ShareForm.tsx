import { useRef } from 'react';

import { useMutation } from '@redwoodjs/web';
import { toast } from '@redwoodjs/web/dist/toast';

const SET_ACCESS_MUTATION = gql`
  mutation SetAccessMutation($input: SetAccessInput!) {
    access(input: $input)
  }
`;

const ShareForm = ({ id, type, emails = [] }: { id: number; type: string; emails?: string[] }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [setAccess] = useMutation(SET_ACCESS_MUTATION, {
    onCompleted: (res) => {
      if (res.access) {
        toast.success('Successfully updated access.');
      } else {
        toast.error('Error while sharing content.');
      }
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const share = async () => {
    const emails = inputRef.current.value
      .split(',')
      .filter(Boolean)
      .map((email) => email.trim());
    const input = { id, type, emails };

    setAccess({
      variables: {
        input,
      },
    });
  };

  return (
    <div>
      <h2>Share</h2>
      <div className="flex items-baseline">
        <input
          type="text"
          className="rw-input mr-3"
          placeholder="Comma-separate emails"
          defaultValue={emails.join(', ')}
          ref={inputRef}
        />
        <button className="green-button" onClick={share}>
          Share
        </button>
      </div>
    </div>
  );
};

export default ShareForm;
