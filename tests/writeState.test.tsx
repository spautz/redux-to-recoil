import React from 'react';
import { Store } from 'redux';
import { RecoilState, useRecoilState } from 'recoil';
import { act, renderRecoilHook } from 'react-recoil-hooks-testing-library';

import atomFromRedux from '../src/atomFromRedux';

import { createTestStore, createTestWrapper, VALUE1_DEFAULT, VALUE2_DEFAULT } from './helpers';

describe('write Redux state through Recoil', () => {
  let testStore: Store;
  let ReduxProviderWrapper: React.FC;
  beforeEach(() => {
    testStore = createTestStore();
    ReduxProviderWrapper = createTestWrapper(testStore);
  });

  it('writes values to Redux', () => {
    const value1Atom: RecoilState<number> = atomFromRedux<number>('value1');
    const value1AtomHook = () => useRecoilState(value1Atom);

    const { result, rerender } = renderRecoilHook(value1AtomHook, {
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
    const missingValueAtomHook = () => useRecoilState(missingValueAtom);

    const { result, rerender } = renderRecoilHook(missingValueAtomHook, {
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
    const rootAtomHook = () => useRecoilState(rootAtom);

    const { result, rerender } = renderRecoilHook(rootAtomHook, {
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
});
