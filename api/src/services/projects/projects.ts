import type {
  QueryResolvers,
  MutationResolvers,
  ProjectRelationResolvers,
  ProjectStageRelationResolvers,
} from 'types/graphql';

import { db } from 'src/lib/db';

export const projects: QueryResolvers['projects'] = (_, { context }) => {
  const userId = context.currentUser['id'];

  return db.project.findMany({
    where: { userId },
    orderBy: { name: 'asc' },
  });
};

export const project: QueryResolvers['project'] = ({ id }, { context }) => {
  const userId = context.currentUser['id'];

  return db.project.findFirst({
    where: { id, userId },
  });
};

export const createProject: MutationResolvers['createProject'] = ({ input }, { context }) => {
  const userId = context.currentUser['id'];

  return db.project.create({
    data: { ...input, userId },
  });
};

export const updateProject: MutationResolvers['updateProject'] = async ({ id, input }, { context }) => {
  const userId = context.currentUser['id'];
  await db.project.findFirstOrThrow({ where: { userId, id } });

  return db.project.update({ data: input, where: { id } });
};

export const deleteProject: MutationResolvers['deleteProject'] = async ({ id }, { context }) => {
  const userId = context.currentUser['id'];
  await db.project.findFirstOrThrow({ where: { userId, id } });

  return db.project.delete({ where: { id } });
};

export const Project: ProjectRelationResolvers = {
  stages: async (_, { root }) => {
    return db.projectStage.findMany({
      where: {
        projectId: root?.id,
      },
      orderBy: { sortOrder: 'asc' },
    });
  },
};

export const ProjectStage: ProjectStageRelationResolvers = {
  tasks: async (_, { root }) => {
    return db.projectTask.findMany({
      where: { projectStageId: root?.id },
    });
  },
};
