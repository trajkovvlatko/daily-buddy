import type { FindSettingById, FindSettingByIdVariables } from "types/graphql";

import type {
  CellSuccessProps,
  CellFailureProps,
  TypedDocumentNode,
} from "@redwoodjs/web";

import Setting from "src/components/Setting/Setting";

export const QUERY: TypedDocumentNode<
  FindSettingById,
  FindSettingByIdVariables
> = gql`
  query FindSettingById($id: Int!) {
    setting: setting(id: $id) {
      id
      key
      value
      createdAt
      updatedAt
    }
  }
`;

export const Loading = () => <div>Loading...</div>;

export const Empty = () => <div>Setting not found</div>;

export const Failure = ({
  error,
}: CellFailureProps<FindSettingByIdVariables>) => (
  <div className="rw-cell-error">{error?.message}</div>
);

export const Success = ({
  setting,
}: CellSuccessProps<FindSettingById, FindSettingByIdVariables>) => {
  return <Setting setting={setting} />;
};
