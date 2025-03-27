import type {
  DeleteSettingMutation,
  DeleteSettingMutationVariables,
  FindSettingById,
} from "types/graphql";

import { Link, routes, navigate } from "@redwoodjs/router";
import { useMutation } from "@redwoodjs/web";
import type { TypedDocumentNode } from "@redwoodjs/web";
import { toast } from "@redwoodjs/web/toast";

import { timeTag } from "src/lib/formatters";

const DELETE_SETTING_MUTATION: TypedDocumentNode<
  DeleteSettingMutation,
  DeleteSettingMutationVariables
> = gql`
  mutation DeleteSettingMutation($id: Int!) {
    deleteSetting(id: $id) {
      id
    }
  }
`;

interface Props {
  setting: NonNullable<FindSettingById["setting"]>;
}

const Setting = ({ setting }: Props) => {
  const [deleteSetting] = useMutation(DELETE_SETTING_MUTATION, {
    onCompleted: () => {
      toast.success("Setting deleted");
      navigate(routes.settings());
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onDeleteClick = (id: DeleteSettingMutationVariables["id"]) => {
    if (confirm("Are you sure you want to delete setting " + id + "?")) {
      deleteSetting({ variables: { id } });
    }
  };

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            Setting {setting.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{setting.id}</td>
            </tr>
            <tr>
              <th>Key</th>
              <td>{setting.key}</td>
            </tr>
            <tr>
              <th>Value</th>
              <td>{setting.value}</td>
            </tr>
            <tr>
              <th>Created at</th>
              <td>{timeTag(setting.createdAt)}</td>
            </tr>
            <tr>
              <th>Updated at</th>
              <td>{timeTag(setting.updatedAt)}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editSetting({ id: setting.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(setting.id)}
        >
          Delete
        </button>
      </nav>
    </>
  );
};

export default Setting;
