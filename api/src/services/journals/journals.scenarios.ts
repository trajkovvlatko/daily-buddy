import type { Prisma, Journal } from '@prisma/client';
import type { ScenarioData } from '@redwoodjs/testing/api';

export const standard = defineScenario<Prisma.JournalCreateArgs>({
  journal: {
    one: {
      data: {
        forDate: '2022-12-11T20:33:09.082Z',
        content: 'String',
        User: { create: { email: 'String2633306', hashedPassword: 'String', salt: 'String' } },
      },
    },
    two: {
      data: {
        forDate: '2022-12-11T20:33:09.082Z',
        content: 'String',
        User: { create: { email: 'String2095132', hashedPassword: 'String', salt: 'String' } },
      },
    },
  },
});

export type StandardScenario = ScenarioData<Journal, 'journal'>;
