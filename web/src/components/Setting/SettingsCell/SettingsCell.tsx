import type { FindSettings, FindSettingsVariables } from "types/graphql";

import { Link, routes } from "@redwoodjs/router";
import type {
  CellSuccessProps,
  CellFailureProps,
  TypedDocumentNode,
} from "@redwoodjs/web";

import Settings from "src/components/Setting/Settings";

export const QUERY: TypedDocumentNode<FindSettings, FindSettingsVariables> =
  gql`
    query FindSettings {
      settings {
        id
        key
        value
        createdAt
        updatedAt
      }
    }
  `;

export const Loading = () => <div>Loading...</div>;

export const Empty = () => {
  return (
    <div className="rw-text-center">
      No settings yet.{" "}
      <Link to={routes.newSetting()} className="rw-link">
        Create one?
      </Link>
    </div>
  );
};

export const Failure = ({ error }: CellFailureProps<FindSettings>) => (
  <div className="rw-cell-error">{error?.message}</div>
);

export const Success = ({
  settings,
}: CellSuccessProps<FindSettings, FindSettingsVariables>) => {
  return <Settings settings={settings} />;
};
