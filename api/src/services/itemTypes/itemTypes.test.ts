import type { ItemType } from '@prisma/client';

import { itemTypes, itemType, createItemType, updateItemType, deleteItemType } from './itemTypes';
import type { StandardScenario } from './itemTypes.scenarios';

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('itemTypes', () => {
  scenario('returns all itemTypes', async (scenario: StandardScenario) => {
    const result = await itemTypes();

    expect(result.length).toEqual(Object.keys(scenario.itemType).length);
  });

  scenario('returns a single itemType', async (scenario: StandardScenario) => {
    const result = await itemType({ id: scenario.itemType.one.id });

    expect(result).toEqual(scenario.itemType.one);
  });

  scenario('creates a itemType', async (scenario: StandardScenario) => {
    const result = await createItemType({
      input: { itemType: 'String', userId: scenario.itemType.two.userId },
    });

    expect(result.itemType).toEqual('String');
    expect(result.userId).toEqual(scenario.itemType.two.userId);
  });

  scenario('updates a itemType', async (scenario: StandardScenario) => {
    const original = (await itemType({ id: scenario.itemType.one.id })) as ItemType;
    const result = await updateItemType({
      id: original.id,
      input: { itemType: 'String2' },
    });

    expect(result.itemType).toEqual('String2');
  });

  scenario('deletes a itemType', async (scenario: StandardScenario) => {
    const original = (await deleteItemType({ id: scenario.itemType.one.id })) as ItemType;
    const result = await itemType({ id: original.id });

    expect(result).toEqual(null);
  });
});
