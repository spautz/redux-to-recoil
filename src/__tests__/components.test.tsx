import React from 'react';
import { Store } from 'redux';
import { Provider } from 'react-redux';
import { RecoilRoot } from 'recoil';
import { render } from '@testing-library/react';

import { reduxStoreRef, resetStateBetweenTests } from '../internals';
import { SyncReduxToRecoil } from '../SyncReduxToRecoil';

import { createTestStore } from './_helpers';

describe('read Redux state through Recoil', () => {
  let testStore: Store;
  const originalConsoleError: typeof console.error = console.error;
  const originalConsoleWarn: typeof console.warn = console.warn;

  beforeEach(() => {
    jest.restoreAllMocks();
    jest.resetModules();

    resetStateBetweenTests();
    testStore = createTestStore();
  });
  afterEach(() => {
    console.error = originalConsoleError;
    console.warn = originalConsoleWarn;
  });

  it('needs to be within a Redux context', () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockReturnValue();

    expect(() => {
      render(
        <RecoilRoot>
          <SyncReduxToRecoil />
        </RecoilRoot>,
      );
    }).toThrowError(
      'could not find react-redux context value; please ensure the component is wrapped in a <Provider>',
    );

    const consoleErrorCalls = consoleErrorSpy.mock.calls;
    expect(consoleErrorCalls.length).toBe(2);
    expect(consoleErrorCalls[0][0]).toMatch(
      'could not find react-redux context value; please ensure the component is wrapped in a <Provider>',
    );
    expect(consoleErrorCalls[1][0]).toMatch(
      'The above error occurred in the <SyncReduxToRecoil> component',
    );
    consoleErrorSpy.mockRestore();
  });

  it('needs to be within a Recoil context', () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockReturnValue();

    expect(() => {
      render(
        <Provider store={testStore}>
          <SyncReduxToRecoil />
        </Provider>,
      );
    }).toThrowError('This component must be used inside a <RecoilRoot> component.');

    const consoleErrorCalls = consoleErrorSpy.mock.calls;
    expect(consoleErrorCalls.length).toBe(2);
    expect(consoleErrorCalls[0][0]).toMatch(
      'This component must be used inside a <RecoilRoot> component',
    );
    expect(consoleErrorCalls[1][0]).toMatch(
      'The above error occurred in the <SyncReduxToRecoil> component',
    );
    consoleErrorSpy.mockRestore();
  });

  it('warns if SyncReduxToRecoil is given invalid options', () => {
    const consoleWarnSpy = jest.spyOn(console, 'warn').mockReturnValue();

    const { rerender } = render(
      <Provider store={testStore}>
        <RecoilRoot>
          {/* @ts-expect-error Invalid prop */}
          <SyncReduxToRecoil invalidOption={123} />
        </RecoilRoot>
      </Provider>,
    );

    rerender(
      <Provider store={testStore}>
        <RecoilRoot>
          <p>No more SyncReduxToRecoil</p>
        </RecoilRoot>
      </Provider>,
    );

    const consoleWarnCalls = consoleWarnSpy.mock.calls;
    expect(consoleWarnCalls.length).toBe(1);
    expect(consoleWarnCalls[0][0]).toEqual(
      'SyncReduxToRecoil: Unrecognized option "invalidOption"',
    );
    consoleWarnSpy.mockRestore();
  });

  it('sets a reference to the redux store synchronously on mount', () => {
    render(
      <Provider store={testStore}>
        <RecoilRoot>
          <SyncReduxToRecoil />
        </RecoilRoot>
      </Provider>,
    );

    expect(reduxStoreRef.c).toBeTruthy();
  });

  it('clears its reference to the redux store on unmount', () => {
    const { rerender } = render(
      <Provider store={testStore}>
        <RecoilRoot>
          <SyncReduxToRecoil />
        </RecoilRoot>
      </Provider>,
    );

    expect(reduxStoreRef.c).toBeTruthy();

    rerender(
      <Provider store={testStore}>
        <RecoilRoot>
          <p>No more SyncReduxToRecoil</p>
        </RecoilRoot>
      </Provider>,
    );

    expect(reduxStoreRef.c).toBeNull();
  });
});
