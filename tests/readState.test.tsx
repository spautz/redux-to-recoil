/* eslint-env jest */
import React from 'react';
import { AnyAction, createStore, Store } from 'redux';
import { Provider } from 'react-redux';
import { RecoilState, useRecoilValue } from 'recoil';
import { act, renderRecoilHook } from 'react-recoil-hooks-testing-library';

import atomFromRedux from '../src/atomFromRedux';
import SyncReduxToRecoil from '../src/SyncReduxToRecoil';
import syncChangesFromRecoil from '../src/syncChangesFromRecoil';
import { ReduxState } from '../src/internals';

const testReducer = (state: ReduxState, action: AnyAction): ReduxState => {
  if (action.type === 'INCREMENT_KEY') {
    const { key } = action.payload;

    return {
      ...state,
      [key]: (state[key] || 0) + 1,
    };
  }
  return state;
};

describe('read Redux state through Recoil', () => {
  let reduxStore: Store;
  let ReduxProviderWrapper: React.FC;
  beforeEach(() => {
    reduxStore = createStore(syncChangesFromRecoil(testReducer), {
      value1: 100,
      value2: 200,
    });
    ReduxProviderWrapper = ({ children }) => (
      <Provider store={reduxStore}>
        <SyncReduxToRecoil />
        {children}
      </Provider>
    );
  });

  it('reads values from Redux', () => {
    const value1Atom: RecoilState<number> = atomFromRedux<number>('value1');
    const value1AtomHook = () => useRecoilValue(value1Atom);

    const { result } = renderRecoilHook(value1AtomHook, {
      wrapper: ReduxProviderWrapper,
    });

    const value1: number = result.current;
    expect(value1).toBe(100);
  });

  it('reads absent values from Redux', () => {
    const value1Atom: RecoilState<unknown> = atomFromRedux('not found');
    const value1AtomHook = () => useRecoilValue(value1Atom);

    const { result } = renderRecoilHook(value1AtomHook, {
      wrapper: ReduxProviderWrapper,
    });

    const value1 = result.current;
    expect(value1).toBe(undefined);
  });

  it('can read the entire state', () => {
    const rootAtom: RecoilState<unknown> = atomFromRedux('.');
    const rootAtomHook = () => useRecoilValue(rootAtom);

    const { result } = renderRecoilHook(rootAtomHook, {
      wrapper: ReduxProviderWrapper,
    });

    const root = result.current;
    expect(root).toBe(reduxStore.getState());
  });

  it('works with or without a leading dot', () => {
    const atomWithDot: RecoilState<number> = atomFromRedux<number>('.value1');
    const atomWithoutDot: RecoilState<number> = atomFromRedux<number>('value1');

    expect(atomWithDot).toStrictEqual(atomWithoutDot);
  });

  it('always sees the current Redux values', () => {
    const value2Atom: RecoilState<number> = atomFromRedux<number>('value2');
    const value2AtomHook = () => useRecoilValue(value2Atom);

    const { result, rerender } = renderRecoilHook(value2AtomHook, {
      wrapper: ReduxProviderWrapper,
    });
    expect(result.current).toBe(200);

    const incrementValue2Action = {
      type: 'INCREMENT_KEY',
      payload: { key: 'value2' },
    };
    act(() => {
      reduxStore.dispatch(incrementValue2Action);
    });

    rerender();

    expect(result.current).toBe(201);
  });
});
