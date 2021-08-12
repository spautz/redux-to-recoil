import { ReadOnlySelectorOptions, RecoilValueReadOnly, selector } from 'recoil';

import { DefaultReturnType, ReduxState, getReduxStateAtom, reduxStoreRef } from './internals';

let selectorCount = 0;

/**
 * Creates a Recoil selector from a Reselect selector
 */
const selectorFromReselect = <ReturnType = DefaultReturnType>(
  selectorFn: (reduxState: ReduxState) => ReturnType,
  extraSelectorOptions: Partial<ReadOnlySelectorOptions<unknown>> = {},
): RecoilValueReadOnly<ReturnType> => {
  selectorCount++;

  if (process.env.NODE_ENV !== 'production' && extraSelectorOptions.get) {
    console.warn(
      'extraSelectorOptions.get is not supported: core selectorFromReselect functionality cannot be replaced',
    );
  }

  const wrappedSelector = selector<ReturnType>({
    key: `redux-to-recoil:selector:${selectorCount}${selectorFn.name}`,
    ...extraSelectorOptions,
    get: ({ get }) => {
      const reduxStore = reduxStoreRef.c;

      // At initial render the reduxStateAtom will not be populated yet, so fall back to the actual store
      const reduxState: ReduxState =
        get(getReduxStateAtom()) || (reduxStore && reduxStore.getState());

      return selectorFn(reduxState);
    },
  });

  return wrappedSelector;
};

export { selectorFromReselect };
