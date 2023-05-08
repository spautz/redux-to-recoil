import React, { ReactNode } from 'react';
import { Store } from 'redux';
import { Provider } from 'react-redux';
import { RecoilState, useRecoilValue } from 'recoil';
import { act, renderRecoilHook } from 'react-recoil-hooks-testing-library';
import { describe, beforeEach, afterEach, expect, it, vitest } from 'vitest';

import { atomFromRedux } from '../atomFromRedux';

import {
  createTestStore,
  incrementKeyAction,
  VALUE1_DEFAULT,
  VALUE2_DEFAULT,
} from './_helpers/createTestStore';
import { createTestWrapper } from './_helpers/createTestWrapper';
import { resetStateBetweenTests } from '../internals';
import { SyncReduxToRecoilProps } from '../SyncReduxToRecoil';

describe('read Redux state through Recoil', () => {
  let testStore: Store;
  let ReduxProviderWrapper: React.FC<SyncReduxToRecoilProps & { children?: ReactNode }>;
  const originalConsoleError: typeof console.error = console.error;
  const originalConsoleWarn: typeof console.warn = console.warn;
  beforeEach(() => {
    vitest.restoreAllMocks();
    vitest.resetModules();

    resetStateBetweenTests();
    testStore = createTestStore();
    ReduxProviderWrapper = createTestWrapper(testStore);
  });
  afterEach(() => {
    console.error = originalConsoleError;
    console.warn = originalConsoleWarn;
  });

  it('reads values from Redux', () => {
    const value1Atom: RecoilState<number> = atomFromRedux<number>('value1');
    const useValue1Atom = () => useRecoilValue(value1Atom);

    const { result } = renderRecoilHook(useValue1Atom, {
      wrapper: ReduxProviderWrapper,
    });

    const value1: number = result.current;
    expect(value1).toBe(VALUE1_DEFAULT);
  });

  it('reads absent values from Redux', () => {
    const missingValueAtom: RecoilState<unknown> = atomFromRedux('not found');
    const useMissingValueAtom = () => useRecoilValue(missingValueAtom);

    const { result } = renderRecoilHook(useMissingValueAtom, {
      wrapper: ReduxProviderWrapper,
    });

    const missingValue = result.current;
    expect(missingValue).toBe(undefined);
  });

  it('can read the entire state', () => {
    const rootAtom: RecoilState<unknown> = atomFromRedux('.');
    const useRootAtom = () => useRecoilValue(rootAtom);

    const { result } = renderRecoilHook(useRootAtom, {
      wrapper: ReduxProviderWrapper,
    });

    const root = result.current;
    expect(root).toBe(testStore.getState());
  });

  it('works with or without a leading dot', () => {
    const atomWithDot: RecoilState<number> = atomFromRedux<number>('.value1');
    const atomWithoutDot: RecoilState<number> = atomFromRedux<number>('value1');

    expect(atomWithDot).toStrictEqual(atomWithoutDot);
  });

  it('caches atomFromRedux instances', () => {
    const value1Atom: RecoilState<number> = atomFromRedux<number>('.value1');
    const value2Atom: RecoilState<number> = atomFromRedux<number>('.value2');
    const value1Atom2: RecoilState<number> = atomFromRedux<number>('.value1');

    expect(value1Atom).not.toEqual(value2Atom);
    expect(value1Atom).toStrictEqual(value1Atom2);
  });

  it('always sees the current Redux values', () => {
    const value2Atom: RecoilState<number> = atomFromRedux<number>('value2');
    const useValue2Atom = () => useRecoilValue(value2Atom);

    const { result, rerender } = renderRecoilHook(useValue2Atom, {
      wrapper: ReduxProviderWrapper,
    });
    expect(result.current).toBe(VALUE2_DEFAULT);

    act(() => {
      testStore.dispatch(incrementKeyAction('value2'));
    });

    rerender();

    expect(result.current).toBe(VALUE2_DEFAULT + 1);
  });

  it('throws an error if you try to read without SyncReduxToRecoil', () => {
    const WrapperWithoutSync: React.FC<{ children?: ReactNode }> = ({ children }) => (
      <Provider store={testStore}>{children}</Provider>
    );
    const value1Atom: RecoilState<number> = atomFromRedux<number>('no-sync');
    const useValue1Atom = () => useRecoilValue(value1Atom);

    const { result } = renderRecoilHook(useValue1Atom, {
      wrapper: WrapperWithoutSync,
    });

    expect(result.error).toBeTruthy();
    expect(result.error.message).toEqual(
      'Cannot read from Redux because <SyncReduxToRecoil> is not mounted',
    );
  });

  it('warns and returns undefined if readEnabled has never been on', () => {
    const consoleWarnSpy = vitest.spyOn(console, 'warn').mockReturnValueOnce();

    const nullStore = createTestStore(null);
    const NullReduxProviderWrapper = createTestWrapper(nullStore);

    const value1Atom: RecoilState<number> = atomFromRedux<number>('value1');
    const useValue1Atom = () => useRecoilValue(value1Atom);

    const { result } = renderRecoilHook(useValue1Atom, {
      wrapper: NullReduxProviderWrapper,
      initialProps: {
        readEnabled: false,
      },
    });

    const value1 = result.current;
    expect(value1).toBe(undefined);

    const consoleWarnCalls = consoleWarnSpy.mock.calls;
    expect(consoleWarnCalls.length).toBe(1);
    expect(consoleWarnCalls[0][0]).toBe(
      'Cannot access Redux state because reads have never been enabled',
    );
    consoleWarnSpy.mockRestore();
  });

  it('does not update unless readEnabled is on', () => {
    const value1Atom: RecoilState<number> = atomFromRedux<number>('value1');
    const useValue1Atom = () => useRecoilValue(value1Atom);

    const { result, rerender } = renderRecoilHook(useValue1Atom, {
      wrapper: ReduxProviderWrapper,
      initialProps: {
        readEnabled: true,
      },
    });

    let value1: number = result.current;
    expect(value1).toBe(VALUE1_DEFAULT);

    // Disable reads, then update redux
    act(() => {
      rerender({
        readEnabled: false,
      });
    });
    act(() => {
      testStore.dispatch(incrementKeyAction('value1'));
    });

    // Should be unchanged
    value1 = result.current;
    expect(value1).toBe(VALUE1_DEFAULT);

    act(() => {
      testStore.dispatch(incrementKeyAction('value1'));
    });
    rerender({
      readEnabled: true,
    });

    // Both changes should have gone through, and now we can see them
    value1 = result.current;
    expect(value1).toBe(VALUE1_DEFAULT + 2);
  });
});
