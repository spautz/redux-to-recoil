import { RecoilValueReadOnly, selector } from 'recoil';

import internalStateAtom from './internalStateAtom';
import { DefaultReturnType, ReduxState } from './types';

let count = 0;

const selectorFromReselect = <ReturnType = DefaultReturnType>(
  selectorFn: (reduxState: ReduxState) => ReturnType,
): RecoilValueReadOnly<ReturnType> => {
  count++;

  const wrappedSelector = selector<ReturnType>({
    key: `redux-to-recoil:selector:${count}${selectorFn.name}`,
    get: ({ get }) => {
      const reduxState = get(internalStateAtom);
      const value = selectorFn(reduxState);
      return value;
    },
  });

  return wrappedSelector;
};

export default selectorFromReselect;
