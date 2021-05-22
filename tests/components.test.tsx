import React from 'react';
import { Store } from 'redux';
import { Provider } from 'react-redux';
import { RecoilRoot } from 'recoil';
import TestRenderer, { act } from 'react-test-renderer';

import { reduxStoreRef, resetStateBetweenTests } from '../src/internals';
import SyncReduxToRecoil from '../src/SyncReduxToRecoil';

import { createTestStore, suppressRecoilValueWarning } from './helpers';

describe('read Redux state through Recoil', () => {
  let testStore: Store;
  let originalConsoleError: typeof console.error;
  beforeEach(() => {
    jest.restoreAllMocks();
    jest.resetModules();

    resetStateBetweenTests();
    testStore = createTestStore();

    originalConsoleError = console.error;
    console.error = suppressRecoilValueWarning();
  });
  afterEach(() => {
    console.error = originalConsoleError;
  });

  it('needs to be within a Redux context', () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockReturnValueOnce();

    expect(() => {
      TestRenderer.create(
        <RecoilRoot>
          <SyncReduxToRecoil />
        </RecoilRoot>,
      );
    }).toThrowError(
      'could not find react-redux context value; please ensure the component is wrapped in a <Provider>',
    );

    const consoleErrorCalls = consoleErrorSpy.mock.calls;
    expect(consoleErrorCalls.length).toBe(1);
  });

  it('needs to be within a Recoil context', () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockReturnValueOnce();

    expect(() => {
      TestRenderer.create(
        <Provider store={testStore}>
          <SyncReduxToRecoil />
        </Provider>,
      );
    }).toThrowError('This component must be used inside a <RecoilRoot> component.');

    const consoleErrorCalls = consoleErrorSpy.mock.calls;
    expect(consoleErrorCalls.length).toBe(1);
  });

  it('warns if SyncReduxToRecoil is given invalid options', () => {
    const consoleWarnSpy = jest.spyOn(console, 'warn').mockReturnValueOnce();

    TestRenderer.create(
      <Provider store={testStore}>
        <RecoilRoot>
          {/* @ts-expect-error Invalid prop */}
          <SyncReduxToRecoil invalidOption={123} />
        </RecoilRoot>
      </Provider>,
    );

    const consoleWarnCalls = consoleWarnSpy.mock.calls;
    expect(consoleWarnCalls.length).toBe(1);
    const [warningString] = consoleWarnCalls[0];
    expect(warningString).toBe('SyncReduxToRecoil: Unrecognized option "invalidOption"');
  });

  it('sets a reference to the redux store synchronously on mount', () => {
    TestRenderer.create(
      <Provider store={testStore}>
        <RecoilRoot>
          <SyncReduxToRecoil />
        </RecoilRoot>
      </Provider>,
    );

    expect(reduxStoreRef.c).toBeTruthy();
  });

  it('clears its reference to the redux store on unmount', () => {
    const testRenderer = TestRenderer.create(
      <Provider store={testStore}>
        <RecoilRoot>
          <SyncReduxToRecoil />
        </RecoilRoot>
      </Provider>,
    );

    expect(reduxStoreRef.c).toBeTruthy();

    testRenderer.update(<div />);
    // In React 17 the useEffect cleanup function runs *after* unmount, so we
    // need to wait an extra tick
    act(() => {
      // do nothing
    });

    expect(reduxStoreRef.c).toBeNull();
  });
});
