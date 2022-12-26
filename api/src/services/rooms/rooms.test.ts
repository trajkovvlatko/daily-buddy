import type { Room } from '@prisma/client';

import { rooms, room, createRoom, updateRoom, deleteRoom } from './rooms';
import type { StandardScenario } from './rooms.scenarios';

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('rooms', () => {
  scenario('returns all rooms', async (scenario: StandardScenario) => {
    const result = await rooms();

    expect(result.length).toEqual(Object.keys(scenario.room).length);
  });

  scenario('returns a single room', async (scenario: StandardScenario) => {
    const result = await room({ id: scenario.room.one.id });

    expect(result).toEqual(scenario.room.one);
  });

  scenario('creates a room', async (scenario: StandardScenario) => {
    const result = await createRoom({
      input: { name: 'String', userId: scenario.room.two.userId },
    });

    expect(result.name).toEqual('String');
    expect(result.userId).toEqual(scenario.room.two.userId);
  });

  scenario('updates a room', async (scenario: StandardScenario) => {
    const original = (await room({ id: scenario.room.one.id })) as Room;
    const result = await updateRoom({
      id: original.id,
      input: { name: 'String2' },
    });

    expect(result.name).toEqual('String2');
  });

  scenario('deletes a room', async (scenario: StandardScenario) => {
    const original = (await deleteRoom({ id: scenario.room.one.id })) as Room;
    const result = await room({ id: original.id });

    expect(result).toEqual(null);
  });
});
