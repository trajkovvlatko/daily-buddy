import type { Calendar } from '@prisma/client';

import { calendars, calendar, createCalendar, updateCalendar, deleteCalendar } from './calendars';
import type { StandardScenario } from './calendars.scenarios';

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('calendars', () => {
  scenario('returns all calendars', async (scenario: StandardScenario) => {
    const result = await calendars();

    expect(result.length).toEqual(Object.keys(scenario.calendar).length);
  });

  scenario('returns a single calendar', async (scenario: StandardScenario) => {
    const result = await calendar({ id: scenario.calendar.one.id });

    expect(result).toEqual(scenario.calendar.one);
  });

  scenario('creates a calendar', async (scenario: StandardScenario) => {
    const result = await createCalendar({
      input: { title: 'String', color: 'String', url: 'String', userId: scenario.calendar.two.userId },
    });

    expect(result.title).toEqual('String');
    expect(result.color).toEqual('String');
    expect(result.url).toEqual('String');
    expect(result.userId).toEqual(scenario.calendar.two.userId);
  });

  scenario('updates a calendar', async (scenario: StandardScenario) => {
    const original = (await calendar({ id: scenario.calendar.one.id })) as Calendar;
    const result = await updateCalendar({
      id: original.id,
      input: { title: 'String2' },
    });

    expect(result.title).toEqual('String2');
  });

  scenario('deletes a calendar', async (scenario: StandardScenario) => {
    const original = (await deleteCalendar({ id: scenario.calendar.one.id })) as Calendar;
    const result = await calendar({ id: original.id });

    expect(result).toEqual(null);
  });
});
