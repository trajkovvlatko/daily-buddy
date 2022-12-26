import type { Drawer } from '@prisma/client';

import { drawers, drawer, createDrawer, updateDrawer, deleteDrawer } from './drawers';
import type { StandardScenario } from './drawers.scenarios';

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('drawers', () => {
  scenario('returns all drawers', async (scenario: StandardScenario) => {
    const result = await drawers();

    expect(result.length).toEqual(Object.keys(scenario.drawer).length);
  });

  scenario('returns a single drawer', async (scenario: StandardScenario) => {
    const result = await drawer({ id: scenario.drawer.one.id });

    expect(result).toEqual(scenario.drawer.one);
  });

  scenario('creates a drawer', async (scenario: StandardScenario) => {
    const result = await createDrawer({
      input: { level: 2552271, storageUnitId: scenario.drawer.two.storageUnitId, userId: scenario.drawer.two.userId },
    });

    expect(result.level).toEqual(2552271);
    expect(result.storageUnitId).toEqual(scenario.drawer.two.storageUnitId);
    expect(result.userId).toEqual(scenario.drawer.two.userId);
  });

  scenario('updates a drawer', async (scenario: StandardScenario) => {
    const original = (await drawer({ id: scenario.drawer.one.id })) as Drawer;
    const result = await updateDrawer({
      id: original.id,
      input: { level: 9633881 },
    });

    expect(result.level).toEqual(9633881);
  });

  scenario('deletes a drawer', async (scenario: StandardScenario) => {
    const original = (await deleteDrawer({ id: scenario.drawer.one.id })) as Drawer;
    const result = await drawer({ id: original.id });

    expect(result).toEqual(null);
  });
});
