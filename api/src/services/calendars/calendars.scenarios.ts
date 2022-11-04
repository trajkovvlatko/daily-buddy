import type { Prisma, Calendar } from '@prisma/client';
import type { ScenarioData } from '@redwoodjs/testing/api';

export const standard = defineScenario<Prisma.CalendarCreateArgs>({
  calendar: {
    one: {
      data: {
        title: 'String',
        color: 'String',
        url: 'String',
        User: { create: { email: 'String4739913', hashedPassword: 'String', salt: 'String' } },
      },
    },
    two: {
      data: {
        title: 'String',
        color: 'String',
        url: 'String',
        User: { create: { email: 'String9603544', hashedPassword: 'String', salt: 'String' } },
      },
    },
  },
});

export type StandardScenario = ScenarioData<Calendar, 'calendar'>;
