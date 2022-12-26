import type { StorageUnit } from '@prisma/client';

import { storageUnits, storageUnit, createStorageUnit, updateStorageUnit, deleteStorageUnit } from './storageUnits';
import type { StandardScenario } from './storageUnits.scenarios';

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('storageUnits', () => {
  scenario('returns all storageUnits', async (scenario: StandardScenario) => {
    const result = await storageUnits();

    expect(result.length).toEqual(Object.keys(scenario.storageUnit).length);
  });

  scenario('returns a single storageUnit', async (scenario: StandardScenario) => {
    const result = await storageUnit({ id: scenario.storageUnit.one.id });

    expect(result).toEqual(scenario.storageUnit.one);
  });

  scenario('creates a storageUnit', async (scenario: StandardScenario) => {
    const result = await createStorageUnit({
      input: { name: 'String', roomId: scenario.storageUnit.two.roomId, userId: scenario.storageUnit.two.userId },
    });

    expect(result.name).toEqual('String');
    expect(result.roomId).toEqual(scenario.storageUnit.two.roomId);
    expect(result.userId).toEqual(scenario.storageUnit.two.userId);
  });

  scenario('updates a storageUnit', async (scenario: StandardScenario) => {
    const original = (await storageUnit({ id: scenario.storageUnit.one.id })) as StorageUnit;
    const result = await updateStorageUnit({
      id: original.id,
      input: { name: 'String2' },
    });

    expect(result.name).toEqual('String2');
  });

  scenario('deletes a storageUnit', async (scenario: StandardScenario) => {
    const original = (await deleteStorageUnit({ id: scenario.storageUnit.one.id })) as StorageUnit;
    const result = await storageUnit({ id: original.id });

    expect(result).toEqual(null);
  });
});
