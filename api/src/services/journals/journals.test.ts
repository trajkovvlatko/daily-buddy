import type { Journal } from '@prisma/client';

import { journals, journal, createJournal, updateJournal, deleteJournal } from './journals';
import type { StandardScenario } from './journals.scenarios';

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('journals', () => {
  scenario('returns all journals', async (scenario: StandardScenario) => {
    const result = await journals();

    expect(result.length).toEqual(Object.keys(scenario.journal).length);
  });

  scenario('returns a single journal', async (scenario: StandardScenario) => {
    const result = await journal({ id: scenario.journal.one.id });

    expect(result).toEqual(scenario.journal.one);
  });

  scenario('creates a journal', async (scenario: StandardScenario) => {
    const result = await createJournal({
      input: { forDate: '2022-12-11T20:33:09.062Z', content: 'String', userId: scenario.journal.two.userId },
    });

    expect(result.forDate).toEqual(new Date('2022-12-11T20:33:09.062Z'));
    expect(result.content).toEqual('String');
    expect(result.userId).toEqual(scenario.journal.two.userId);
  });

  scenario('updates a journal', async (scenario: StandardScenario) => {
    const original = (await journal({ id: scenario.journal.one.id })) as Journal;
    const result = await updateJournal({
      id: original.id,
      input: { forDate: '2022-12-12T20:33:09.062Z' },
    });

    expect(result.forDate).toEqual(new Date('2022-12-12T20:33:09.062Z'));
  });

  scenario('deletes a journal', async (scenario: StandardScenario) => {
    const original = (await deleteJournal({ id: scenario.journal.one.id })) as Journal;
    const result = await journal({ id: original.id });

    expect(result).toEqual(null);
  });
});
