import type { Prisma, Room } from '@prisma/client';
import type { ScenarioData } from '@redwoodjs/testing/api';

export const standard = defineScenario<Prisma.RoomCreateArgs>({
  room: {
    one: {
      data: { name: 'String', User: { create: { email: 'String7464588', hashedPassword: 'String', salt: 'String' } } },
    },
    two: {
      data: { name: 'String', User: { create: { email: 'String1791127', hashedPassword: 'String', salt: 'String' } } },
    },
  },
});

export type StandardScenario = ScenarioData<Room, 'room'>;
