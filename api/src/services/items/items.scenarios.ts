import type { Prisma, Item } from '@prisma/client';
import type { ScenarioData } from '@redwoodjs/testing/api';

export const standard = defineScenario<Prisma.ItemCreateArgs>({
  item: {
    one: {
      data: {
        name: 'String',
        Drawer: {
          create: {
            level: 3062763,
            StorageUnit: {
              create: {
                name: 'String',
                Room: {
                  create: {
                    name: 'String',
                    User: { create: { email: 'String7769641', hashedPassword: 'String', salt: 'String' } },
                  },
                },
                User: { create: { email: 'String7920840', hashedPassword: 'String', salt: 'String' } },
              },
            },
            User: { create: { email: 'String1851554', hashedPassword: 'String', salt: 'String' } },
          },
        },
        User: { create: { email: 'String6143459', hashedPassword: 'String', salt: 'String' } },
        Color: {
          create: {
            color: 'String',
            User: { create: { email: 'String113292', hashedPassword: 'String', salt: 'String' } },
          },
        },
        ItemType: {
          create: {
            itemType: 'String',
            User: { create: { email: 'String9664717', hashedPassword: 'String', salt: 'String' } },
          },
        },
      },
    },
    two: {
      data: {
        name: 'String',
        Drawer: {
          create: {
            level: 8719035,
            StorageUnit: {
              create: {
                name: 'String',
                Room: {
                  create: {
                    name: 'String',
                    User: { create: { email: 'String7748639', hashedPassword: 'String', salt: 'String' } },
                  },
                },
                User: { create: { email: 'String1385688', hashedPassword: 'String', salt: 'String' } },
              },
            },
            User: { create: { email: 'String1663308', hashedPassword: 'String', salt: 'String' } },
          },
        },
        User: { create: { email: 'String2718558', hashedPassword: 'String', salt: 'String' } },
        Color: {
          create: {
            color: 'String',
            User: { create: { email: 'String7587732', hashedPassword: 'String', salt: 'String' } },
          },
        },
        ItemType: {
          create: {
            itemType: 'String',
            User: { create: { email: 'String3722151', hashedPassword: 'String', salt: 'String' } },
          },
        },
      },
    },
  },
});

export type StandardScenario = ScenarioData<Item, 'item'>;
