import { RecoilValueReadOnly, selector } from 'recoil';

import { DefaultReturnType, ReduxState, getReduxStateAtom, reduxStoreRef } from './internals';

let selectorCount = 0;

const selectorFromReselect = <ReturnType = DefaultReturnType>(
  selectorFn: (reduxState: ReduxState) => ReturnType,
): RecoilValueReadOnly<ReturnType> => {
  selectorCount++;

  const wrappedSelector = selector<ReturnType>({
    key: `redux-to-recoil:selector:${selectorCount}${selectorFn.name}`,
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
