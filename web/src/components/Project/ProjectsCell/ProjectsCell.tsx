import type { FindProjects, Project as ProjectType } from 'types/graphql';

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web';

import { Link, routes } from '@redwoodjs/router';

export const QUERY = gql`
  query FindProjects {
    projects {
      id
      name
      description
    }
  }
`;

export const Loading = () => <div>Loading...</div>;

export const Empty = () => {
  return (
    <div>
      <span className="mt-2 inline-block">{`No projects yet.`}</span>
    </div>
  );
};

export const Failure = ({ error }: CellFailureProps) => <div className="rw-cell-error">{error?.message}</div>;

export const Success = ({ projects }: CellSuccessProps<FindProjects>) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {projects.map((project) => (
        <Link
          to={routes.editProject({ id: project.id })}
          key={project.id}
          className="block mt-3 bg-white p-3 shadow-lg"
        >
          <h3 className="text-2xl font-bold">{project.name}</h3>
          <p>{project.description.length > 50 ? `${project.description.substring(0, 50)}...` : project.description}</p>
        </Link>
      ))}
    </div>
  );
};
