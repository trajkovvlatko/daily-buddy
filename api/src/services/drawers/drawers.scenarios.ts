import type { Prisma, Drawer } from '@prisma/client';
import type { ScenarioData } from '@redwoodjs/testing/api';

export const standard = defineScenario<Prisma.DrawerCreateArgs>({
  drawer: {
    one: {
      data: {
        level: 6051123,
        StorageUnit: {
          create: {
            name: 'String',
            Room: {
              create: {
                name: 'String',
                User: { create: { email: 'String1413678', hashedPassword: 'String', salt: 'String' } },
              },
            },
            User: { create: { email: 'String7920923', hashedPassword: 'String', salt: 'String' } },
          },
        },
        User: { create: { email: 'String7659506', hashedPassword: 'String', salt: 'String' } },
      },
    },
    two: {
      data: {
        level: 3048022,
        StorageUnit: {
          create: {
            name: 'String',
            Room: {
              create: {
                name: 'String',
                User: { create: { email: 'String1311995', hashedPassword: 'String', salt: 'String' } },
              },
            },
            User: { create: { email: 'String3390015', hashedPassword: 'String', salt: 'String' } },
          },
        },
        User: { create: { email: 'String9858896', hashedPassword: 'String', salt: 'String' } },
      },
    },
  },
});

export type StandardScenario = ScenarioData<Drawer, 'drawer'>;
