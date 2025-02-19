import { createMachine } from 'xstate';
import { getMachineShortestPaths } from '../src/index.ts';

describe('types', () => {
  it('`getEvents` should be allowed to return a mutable array', () => {
    const machine = createMachine({
      types: {} as {
        events: { type: 'FOO' } | { type: 'BAR' };
      }
    });

    getMachineShortestPaths(machine, {
      events: [
        {
          type: 'FOO'
        }
      ]
    });
  });

  it('`getEvents` should be allowed to return a readonly array', () => {
    const machine = createMachine({
      types: {} as {
        events: { type: 'FOO' } | { type: 'BAR' };
      }
    });

    getMachineShortestPaths(machine, {
      events: [
        {
          type: 'FOO'
        }
      ]
    });
  });

  it('`events` should allow known event', () => {
    const machine = createMachine({
      types: {} as {
        events: { type: 'FOO'; value: number };
      }
    });

    getMachineShortestPaths(machine, {
      events: [
        {
          type: 'FOO',
          value: 100
        }
      ]
    });
  });

  it('`events` should not require all event types (array literal expression)', () => {
    const machine = createMachine({
      types: {} as {
        events: { type: 'FOO'; value: number } | { type: 'BAR'; value: number };
      }
    });

    getMachineShortestPaths(machine, {
      events: [{ type: 'FOO', value: 100 }]
    });
  });

  it('`events` should not require all event types (tuple)', () => {
    const machine = createMachine({
      types: {} as {
        events: { type: 'FOO'; value: number } | { type: 'BAR'; value: number };
      }
    });

    const events = [{ type: 'FOO', value: 100 }] as const;

    getMachineShortestPaths(machine, {
      events
    });
  });

  it('`events` should not require all event types (function)', () => {
    const machine = createMachine({
      types: {} as {
        events: { type: 'FOO'; value: number } | { type: 'BAR'; value: number };
      }
    });

    getMachineShortestPaths(machine, {
      events: () => [{ type: 'FOO', value: 100 }] as const
    });
  });

  it('`events` should not allow unknown events', () => {
    const machine = createMachine({
      types: { events: {} as { type: 'FOO'; value: number } }
    });

    getMachineShortestPaths(machine, {
      events: [
        {
          // @ts-expect-error
          type: 'UNKNOWN',
          value: 100
        }
      ]
    });
  });

  it('`events` should only allow props of a specific event', () => {
    const machine = createMachine({
      types: {} as {
        events: { type: 'FOO'; value: number } | { type: 'BAR'; other: string };
      }
    });

    getMachineShortestPaths(machine, {
      events: [
        {
          type: 'FOO',
          // @ts-expect-error
          other: 'nana nana nananana'
        }
      ]
    });
  });

  it('`serializeEvent` should be allowed to return plain string', () => {
    const machine = createMachine({});

    getMachineShortestPaths(machine, {
      serializeEvent: () => ''
    });
  });

  it('`serializeState` should be allowed to return plain string', () => {
    const machine = createMachine({});

    getMachineShortestPaths(machine, {
      serializeState: () => ''
    });
  });
});
