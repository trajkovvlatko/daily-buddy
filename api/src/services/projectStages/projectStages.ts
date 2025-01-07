import type { MutationResolvers } from 'types/graphql';
import { db } from 'src/lib/db';

export const createProjectStage: MutationResolvers['createProjectStage'] = async ({ input }, { context }) => {
  const userId = context.currentUser['id'];

  // Ensure the project belongs to the current user
  await db.project.findFirstOrThrow({
    where: { id: input.projectId, userId },
  });

  const lastStage = await db.projectStage.findFirst({
    where: { projectId: input.projectId },
    orderBy: { sortOrder: 'desc' },
  });

  const sortOrder = lastStage ? lastStage.sortOrder + 1 : 0;

  return db.projectStage.create({
    data: {
      ...input,
      sortOrder,
    },
  });
};

export const updateProjectStage: MutationResolvers['updateProjectStage'] = async ({ id, input }, { context }) => {
  const userId = context.currentUser['id'];

  // Ensure the project stage belongs to a project of the current user
  const projectStage = await db.projectStage.findFirstOrThrow({
    where: { id },
    include: { Project: true },
  });

  if (projectStage.Project.userId !== userId) {
    throw new Error('Unauthorized');
  }

  return db.projectStage.update({
    data: input,
    where: { id },
  });
};

export const deleteProjectStage: MutationResolvers['deleteProjectStage'] = async ({ id }, { context }) => {
  const userId = context.currentUser['id'];

  // Ensure the project stage belongs to a project of the current user
  const projectStage = await db.projectStage.findFirstOrThrow({
    where: { id },
    include: { Project: true },
  });

  if (projectStage.Project.userId !== userId) {
    throw new Error('Unauthorized');
  }

  return db.projectStage.delete({
    where: { id },
  });
};
