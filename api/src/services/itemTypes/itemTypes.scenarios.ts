import type { Prisma, ItemType } from '@prisma/client';
import type { ScenarioData } from '@redwoodjs/testing/api';

export const standard = defineScenario<Prisma.ItemTypeCreateArgs>({
  itemType: {
    one: {
      data: {
        itemType: 'String',
        User: { create: { email: 'String8855963', hashedPassword: 'String', salt: 'String' } },
      },
    },
    two: {
      data: {
        itemType: 'String',
        User: { create: { email: 'String1775731', hashedPassword: 'String', salt: 'String' } },
      },
    },
  },
});

export type StandardScenario = ScenarioData<ItemType, 'itemType'>;
