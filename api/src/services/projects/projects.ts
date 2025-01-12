import type {
  QueryResolvers,
  MutationResolvers,
  ProjectRelationResolvers,
  ProjectStageRelationResolvers,
  CreateProjectTaskInput,
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

export const createProject: MutationResolvers['createProject'] = async ({ input }, { context }) => {
  const userId = context.currentUser['id'];

  const project = await db.project.create({
    data: { ...input, userId },
  });

  const stages = ['Inbox', 'Pending', 'In progress', 'Testing', 'Done'];
  for (const [index, stage] of stages.entries()) {
    await db.projectStage.create({
      data: {
        name: stage,
        sortOrder: index,
        projectId: project.id,
      },
    });
  }

  const firstStage = await db.projectStage.findFirst({
    where: { projectId: project.id },
    orderBy: { sortOrder: 'asc' },
  });

  if (firstStage) {
    const tasks: CreateProjectTaskInput[] = [
      {
        name: 'Check project stages',
        description: 'Make sure you the default project stages match with the newly created project',
        labels: ['demo', 'task'],
        status: 'pending',
        projectStageId: firstStage.id,
      },
      {
        name: 'Remove demo tasks',
        description: 'These tasks are just examples, remove them when they are not needed any more.',
        labels: ['demo', 'clean up'],
        status: 'pending',
        projectStageId: firstStage.id,
      },
    ];

    for (const task of tasks) {
      await db.projectTask.create({
        data: {
          ...task,
          projectStageId: firstStage.id,
        },
      });
    }
  }

  return project;
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
