import React, { ReactNode } from 'react';
import { Store } from 'redux';
import { Selector } from 'react-redux';
import { RecoilState, selector, useRecoilValue } from 'recoil';
import { createSelector } from 'reselect';
import { renderRecoilHook } from 'react-recoil-hooks-testing-library';
import { describe, beforeEach, afterEach, expect, it, vitest } from 'vitest';

import { ReduxState, resetStateBetweenTests } from '../internals/index.js';
import { atomFromRedux } from '../atomFromRedux.js';
import { selectorFromReselect } from '../selectorFromReselect.js';

import { createTestStore } from './_helpers/createTestStore';
import { createTestWrapper } from './_helpers/createTestWrapper';

describe('selectors', () => {
  let testStore: Store;
  let ReduxProviderWrapper: React.FC<{ children?: ReactNode }>;
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

  it('reads from plain selector functions', () => {
    const plainReduxSelector: Selector<ReduxState, number> = (state) => state.value1;
    const myRecoilSelector = selectorFromReselect(plainReduxSelector);

    const useMySelector = () => useRecoilValue(myRecoilSelector);
    const { result } = renderRecoilHook(useMySelector, {
      wrapper: ReduxProviderWrapper,
    });

    const value1: number = result.current;
    expect(value1).toBe(100);
  });

  it('reads from reselect selectors', () => {
    const plainReduxSelector: Selector<ReduxState, number> = (state) => state.value1;
    const reselectSelector: Selector<ReduxState, number> = createSelector(
      [plainReduxSelector],
      (value1) => value1 * 123,
    );
    const myRecoilSelector = selectorFromReselect(reselectSelector);

    const useMySelector = () => useRecoilValue(myRecoilSelector);
    const { result } = renderRecoilHook(useMySelector, {
      wrapper: ReduxProviderWrapper,
    });

    const value1: number = result.current;
    expect(value1).toBe(100 * 123);
  });

  it('reads from Recoil selectors', () => {
    const value1Atom: RecoilState<number> = atomFromRedux<number>('value1');
    const value2Atom: RecoilState<number> = atomFromRedux<number>('value2');
    const valueSumSelector = selector({
      key: 'valueSum',
      get: ({ get }) => {
        const value1 = get(value1Atom);
        const value2 = get(value2Atom);
        return value1 + value2;
      },
    });

    const useMySelector = () => useRecoilValue(valueSumSelector);
    const { result } = renderRecoilHook(useMySelector, {
      wrapper: ReduxProviderWrapper,
    });

    const value1: number = result.current;
    expect(value1).toBe(100 + 200);
  });
});
