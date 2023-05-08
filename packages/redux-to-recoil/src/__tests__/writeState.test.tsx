import React, { ReactNode } from 'react';
import { Store } from 'redux';
import { Provider } from 'react-redux';
import { RecoilState, useRecoilState, useSetRecoilState } from 'recoil';
import { act, renderRecoilHook } from 'react-recoil-hooks-testing-library';
import { describe, beforeEach, afterEach, expect, it, vitest } from 'vitest';

import { atomFromRedux } from '../atomFromRedux';

import { createTestStore, VALUE1_DEFAULT, VALUE2_DEFAULT } from './_helpers/createTestStore';
import { createTestWrapper } from './_helpers/createTestWrapper';
import { resetStateBetweenTests } from '../internals';
import { SyncReduxToRecoilProps } from '../SyncReduxToRecoil';

describe('write Redux state through Recoil', () => {
  let testStore: Store;
  let ReduxProviderWrapper: React.FC<SyncReduxToRecoilProps & { children?: ReactNode }>;
  const originalConsoleError: typeof console.error = console.error;
  const originalConsoleWarn: typeof console.warn = console.warn;
  beforeEach(() => {
    vitest.restoreAllMocks();
    vitest.resetModules();
    vitest.clearAllTimers();
    vitest.useRealTimers();

    resetStateBetweenTests();
    testStore = createTestStore();
    ReduxProviderWrapper = createTestWrapper(testStore);
  });
  afterEach(() => {
    console.error = originalConsoleError;
    console.warn = originalConsoleWarn;
  });

  it('writes values to Redux', () => {
    const value1Atom: RecoilState<number> = atomFromRedux<number>('value1');
    const useValue1Atom = () => useRecoilState(value1Atom);

    const { result, rerender } = renderRecoilHook(useValue1Atom, {
      wrapper: ReduxProviderWrapper,
    });

    const [value1, setValue1] = result.current;
    expect(value1).toBe(VALUE1_DEFAULT);

    act(() => {
      setValue1(123);
    });

    rerender();

    const [updatedValue1] = result.current;
    expect(updatedValue1).toBe(123);
  });

  it('creates new values in Redux', () => {
    const missingValueAtom: RecoilState<unknown> = atomFromRedux('not found');
    const useMissingValueAtom = () => useRecoilState(missingValueAtom);

    const { result, rerender } = renderRecoilHook(useMissingValueAtom, {
      wrapper: ReduxProviderWrapper,
    });

    const [missingValue, setMissingValue] = result.current;
    expect(missingValue).toBe(undefined);

    act(() => {
      setMissingValue(999);
    });

    rerender();

    const [updatedValue] = result.current;
    expect(updatedValue).toBe(999);
  });

  it('can replace the entire state', () => {
    const rootAtom: RecoilState<unknown> = atomFromRedux('.');
    const useRootAtom = () => useRecoilState(rootAtom);

    const { result, rerender } = renderRecoilHook(useRootAtom, {
      wrapper: ReduxProviderWrapper,
    });

    const [root, setRoot] = result.current;
    expect(root).toBe(testStore.getState());

    act(() => {
      setRoot({ value1: VALUE2_DEFAULT, value3: 'value3' });
    });

    rerender();

    const [updatedRoot] = result.current;
    expect(updatedRoot).toEqual({
      value1: VALUE2_DEFAULT,
      value3: 'value3',
    });
  });

  it('throws an error if you try to write without SyncReduxToRecoil', () => {
    const WrapperWithoutSync: React.FC<{ children: ReactNode }> = ({ children }) => (
      <Provider store={testStore}>{children}</Provider>
    );
    const value1Atom: RecoilState<number> = atomFromRedux<number>('value1');
    const useValue1Atom = () => useSetRecoilState(value1Atom);

    const { result } = renderRecoilHook(useValue1Atom, {
      wrapper: WrapperWithoutSync,
    });

    const setValue1 = result.current;

    expect(() => {
      act(() => {
        setValue1(() => 123);
      });
    }).toThrowError('Cannot dispatch to Redux because <SyncReduxToRecoil> is not mounted');
  });

  it('emits an error and does nothing if writeEnabled is off', () => {
    const consoleErrorSpy = vitest.spyOn(console, 'error').mockReturnValueOnce();

    const value1Atom: RecoilState<number> = atomFromRedux<number>('value1');
    const useValue1Atom = () => useRecoilState(value1Atom);

    const { result, rerender } = renderRecoilHook(useValue1Atom, {
      wrapper: ReduxProviderWrapper,
      initialProps: {
        writeEnabled: false,
      },
    });

    const [value1, setValue] = result.current;
    expect(value1).toBe(VALUE1_DEFAULT);

    act(() => {
      setValue(999);
    });

    rerender();

    expect(result.current[0]).toBe(VALUE1_DEFAULT);

    const consoleErrorCalls = consoleErrorSpy.mock.calls;

    expect(consoleErrorCalls.length).toBe(1);
    expect(consoleErrorCalls[0][0]).toBe('Cannot dispatch to Redux because writes are disabled');
    consoleErrorSpy.mockRestore();
  });

  it('can batch its writes to Redux', () => {
    vitest.useFakeTimers();

    const value1Atom: RecoilState<number> = atomFromRedux<number>('value1');
    const useValue1Atom = () => useRecoilState(value1Atom);

    const { result, rerender } = renderRecoilHook(useValue1Atom, {
      wrapper: ReduxProviderWrapper,
      initialProps: {
        writeEnabled: true,
        batchWrites: true,
      },
    });

    const [value1, setValue1] = result.current;
    expect(value1).toBe(VALUE1_DEFAULT);

    act(() => {
      setValue1(123);
    });

    rerender();

    // Recoil has updated synchronously, but not Redux
    expect(result.current[0]).toBe(123);
    expect(testStore.getState().value1).toBe(VALUE1_DEFAULT);

    act(() => {
      vitest.runAllTimers();
    });

    rerender();

    // Now the update should be done
    expect(result.current[0]).toBe(123);
    expect(testStore.getState().value1).toBe(123);
  });

  it('queues up multiple writes when batching', () => {
    vitest.useFakeTimers();

    const value1Atom: RecoilState<number> = atomFromRedux<number>('value1');
    const value2Atom: RecoilState<number> = atomFromRedux<number>('value2');
    const useMultipleAtoms = () => [useRecoilState(value1Atom), useRecoilState(value2Atom)];

    const { result, rerender } = renderRecoilHook(useMultipleAtoms, {
      wrapper: ReduxProviderWrapper,
      initialProps: {
        writeEnabled: true,
        batchWrites: true,
      },
    });

    const [[value1, setValue1], [value2, setValue2]] = result.current;
    expect(value1).toBe(VALUE1_DEFAULT);
    expect(value2).toBe(VALUE2_DEFAULT);

    act(() => {
      setValue1(123);
      setValue2(456);
    });

    rerender();

    // Recoil has updated synchronously, but not Redux
    expect(result.current[0][0]).toBe(123);
    expect(testStore.getState().value1).toBe(VALUE1_DEFAULT);
    expect(result.current[1][0]).toBe(456);
    expect(testStore.getState().value2).toBe(VALUE2_DEFAULT);

    act(() => {
      vitest.runAllTimers();
    });

    rerender();

    // Now the update should be done
    expect(result.current[0][0]).toBe(123);
    expect(testStore.getState().value1).toBe(123);
    expect(result.current[1][0]).toBe(456);
    expect(testStore.getState().value2).toBe(456);
  });
});
