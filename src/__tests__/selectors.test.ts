import React from 'react';
import { Store } from 'redux';
import { Selector } from 'react-redux';
import { RecoilState, selector, useRecoilValue } from 'recoil';
import { createSelector } from 'reselect';
import { renderRecoilHook } from 'react-recoil-hooks-testing-library';

import { ReduxState, resetStateBetweenTests } from '../internals';
import { atomFromRedux } from '../atomFromRedux';
import { selectorFromReselect } from '../selectorFromReselect';

import { createTestStore, createTestWrapper, suppressRecoilValueWarning } from './_helpers';

describe('selectors', () => {
  let testStore: Store;
  let ReduxProviderWrapper: React.FC;
  let originalConsoleError: typeof console.error;
  beforeEach(() => {
    jest.restoreAllMocks();
    jest.resetModules();

    resetStateBetweenTests();
    testStore = createTestStore();
    ReduxProviderWrapper = createTestWrapper(testStore);

    originalConsoleError = console.error;
    console.error = suppressRecoilValueWarning();
  });
  afterEach(() => {
    console.error = originalConsoleError;
  });

  it('reads from plain selector functions', () => {
    const plainReduxSelector: Selector<ReduxState, number> = (state) => state.value1;
    const myRecoilSelector = selectorFromReselect(plainReduxSelector);

    const mySelectorHook = () => useRecoilValue(myRecoilSelector);
    const { result } = renderRecoilHook(mySelectorHook, {
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

    const mySelectorHook = () => useRecoilValue(myRecoilSelector);
    const { result } = renderRecoilHook(mySelectorHook, {
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

    const mySelectorHook = () => useRecoilValue(valueSumSelector);
    const { result } = renderRecoilHook(mySelectorHook, {
      wrapper: ReduxProviderWrapper,
    });

    const value1: number = result.current;
    expect(value1).toBe(100 + 200);
  });
});
