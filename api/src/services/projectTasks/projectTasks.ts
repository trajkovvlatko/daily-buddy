import type { MutationResolvers } from 'types/graphql';
import { db } from 'src/lib/db';

export const createProjectTask: MutationResolvers['createProjectTask'] = async ({ input }, { context }) => {
  const userId = context.currentUser['id'];

  // Ensure the project stage belongs to a project of the current user
  const projectStage = await db.projectStage.findFirstOrThrow({
    where: { id: input.projectStageId },
    include: { Project: true },
  });

  if (projectStage.Project.userId !== userId) {
    throw new Error('Unauthorized');
  }

  const lastTask = await db.projectTask.findFirst({
    where: { projectStageId: input.projectStageId },
    orderBy: { sortOrder: 'desc' },
  });

  const sortOrder = lastTask ? lastTask.sortOrder + 1 : 0;

  return db.projectTask.create({
    data: {
      ...input,
      sortOrder,
    },
  });
};

export const updateProjectTask: MutationResolvers['updateProjectTask'] = async ({ id, input }, { context }) => {
  const userId = context.currentUser['id'];

  // Ensure the project task belongs to a project of the current user
  const projectTask = await db.projectTask.findFirstOrThrow({
    where: { id },
    include: { ProjectStage: { include: { Project: true } } },
  });

  if (projectTask.ProjectStage.Project.userId !== userId) {
    throw new Error('Unauthorized');
  }

  return db.projectTask.update({
    data: input,
    where: { id },
  });
};

export const deleteProjectTask: MutationResolvers['deleteProjectTask'] = async ({ id }, { context }) => {
  const userId = context.currentUser['id'];

  // Ensure the project task belongs to a project of the current user
  const projectTask = await db.projectTask.findFirstOrThrow({
    where: { id },
    include: { ProjectStage: { include: { Project: true } } },
  });

  if (projectTask.ProjectStage.Project.userId !== userId) {
    throw new Error('Unauthorized');
  }

  return db.projectTask.delete({
    where: { id },
  });
};

export const updateProjectTasksSortOrder: MutationResolvers['updateProjectTasksSortOrder'] = async (
  { projectStageId, sortOrder },
  { context }
) => {
  const userId = context.currentUser['id'];
  const projectStage = await db.projectStage.findFirstOrThrow({
    where: { id: projectStageId },
    include: { Project: true },
  });

  if (projectStage.Project.userId !== userId) {
    throw new Error('Unauthorized');
  }

  const tasks = sortOrder.map((order, index) => ({
    id: order,
    sortOrder: index,
  }));

  for (const task of tasks) {
    await db.projectTask.update({ data: { sortOrder: task.sortOrder }, where: { id: task.id } });
  }

  return db.projectTask.findMany({ where: { projectStageId } });
};
