/* eslint-env jest */
import React from 'react';
import { createStore, Store } from 'redux';
import { Provider } from 'react-redux';
import { RecoilState, useRecoilState } from 'recoil';
import { act, renderRecoilHook } from 'react-recoil-hooks-testing-library';

import atomFromRedux from '../src/atomFromRedux';
import SyncReduxToRecoil from '../src/SyncReduxToRecoil';
import syncChangesFromRecoil from '../src/syncChangesFromRecoil';

describe('atomFromRedux', () => {
  let reduxStore: Store;
  let ReduxProviderWrapper: React.FC;
  beforeEach(() => {
    reduxStore = createStore(
      syncChangesFromRecoil((state) => state),
      {
        value1: 100,
        value2: 200,
      },
    );
    ReduxProviderWrapper = ({ children }) => (
      <Provider store={reduxStore}>
        <SyncReduxToRecoil />
        {children}
      </Provider>
    );
  });

  it('creates an atom, without leading dot', () => {
    const sampleAtom: RecoilState<any> = atomFromRedux('value1');
    const sampleAtomHook = () => useRecoilState(sampleAtom);

    console.log('about to render...');
    const { result } = renderRecoilHook(sampleAtomHook, {
      wrapper: ReduxProviderWrapper,
    });
    console.log('result = ', result.current);

    const [value, setValue] = result.current;
    expect(value).toBe(100);

    console.log('setting value...');
    act(() => {
      setValue(123);
    });

    act(() => {
      setValue(123);
    });

    renderRecoilHook(sampleAtomHook, {
      wrapper: ReduxProviderWrapper,
    });

    act(() => {
      setValue(123);
    });

    const { result: result2 } = renderRecoilHook(sampleAtomHook, {
      wrapper: ReduxProviderWrapper,
    });
    console.log('result2 = ', result2.current);

    const [value2] = result2.current;
    expect(value2).toBe(123);
  });

  it('creates an atom, with leading dot', () => {
    const sampleAtom: RecoilState<any> = atomFromRedux('.value1');
    console.log('sampleAtom = ', sampleAtom);
  });
});
