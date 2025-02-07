import { Link, routes } from '@redwoodjs/router';

import ProjectsCell from 'src/components/Project/ProjectsCell';

const ProjectsPage = () => {
  return (
    <div className="col-span-12 min-h-[calc(100vh-74px)] md:p-6">
      <div className="flex justify-end">
        <Link to={routes.newProject()} className="green-button mb-3 mr-3 flex pl-6 pr-6 md:mr-0">
          <div className="rw-button-icon">+</div> New project
        </Link>
      </div>
      <ProjectsCell />
    </div>
  );
};

export default ProjectsPage;
