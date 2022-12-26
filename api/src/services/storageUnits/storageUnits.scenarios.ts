import type { Prisma, StorageUnit } from '@prisma/client';
import type { ScenarioData } from '@redwoodjs/testing/api';

export const standard = defineScenario<Prisma.StorageUnitCreateArgs>({
  storageUnit: {
    one: {
      data: {
        name: 'String',
        Room: {
          create: {
            name: 'String',
            User: { create: { email: 'String2835503', hashedPassword: 'String', salt: 'String' } },
          },
        },
        User: { create: { email: 'String91725', hashedPassword: 'String', salt: 'String' } },
      },
    },
    two: {
      data: {
        name: 'String',
        Room: {
          create: {
            name: 'String',
            User: { create: { email: 'String8923806', hashedPassword: 'String', salt: 'String' } },
          },
        },
        User: { create: { email: 'String1063012', hashedPassword: 'String', salt: 'String' } },
      },
    },
  },
});

export type StandardScenario = ScenarioData<StorageUnit, 'storageUnit'>;
