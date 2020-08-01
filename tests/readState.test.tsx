import React from 'react';
import { Store } from 'redux';
import { RecoilState, useRecoilValue } from 'recoil';
import { act, renderRecoilHook } from 'react-recoil-hooks-testing-library';

import atomFromRedux from '../src/atomFromRedux';

import {
  createTestStore,
  createTestWrapper,
  incrementKeyAction,
  VALUE1_DEFAULT,
  VALUE2_DEFAULT,
} from './helpers';

describe('read Redux state through Recoil', () => {
  let testStore: Store;
  let ReduxProviderWrapper: React.FC;
  beforeEach(() => {
    testStore = createTestStore();
    ReduxProviderWrapper = createTestWrapper(testStore);
  });

  it('reads values from Redux', () => {
    const value1Atom: RecoilState<number> = atomFromRedux<number>('value1');
    const value1AtomHook = () => useRecoilValue(value1Atom);

    const { result } = renderRecoilHook(value1AtomHook, {
      wrapper: ReduxProviderWrapper,
    });

    const value1: number = result.current;
    expect(value1).toBe(VALUE1_DEFAULT);
  });

  it('reads absent values from Redux', () => {
    const missingValueAtom: RecoilState<unknown> = atomFromRedux('not found');
    const missingValueAtomHook = () => useRecoilValue(missingValueAtom);

    const { result } = renderRecoilHook(missingValueAtomHook, {
      wrapper: ReduxProviderWrapper,
    });

    const missingValue = result.current;
    expect(missingValue).toBe(undefined);
  });

  it('can read the entire state', () => {
    const rootAtom: RecoilState<unknown> = atomFromRedux('.');
    const rootAtomHook = () => useRecoilValue(rootAtom);

    const { result } = renderRecoilHook(rootAtomHook, {
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
    const value2AtomHook = () => useRecoilValue(value2Atom);

    const { result, rerender } = renderRecoilHook(value2AtomHook, {
      wrapper: ReduxProviderWrapper,
    });
    expect(result.current).toBe(VALUE2_DEFAULT);

    act(() => {
      testStore.dispatch(incrementKeyAction('value2'));
    });

    rerender();

    expect(result.current).toBe(VALUE2_DEFAULT + 1);
  });
});
