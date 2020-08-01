import { RecoilValueReadOnly, selector } from 'recoil';

import { DefaultReturnType, ReduxState, reduxStateAtom } from './internals';

let selectorCount = 0;

const selectorFromReselect = <ReturnType = DefaultReturnType>(
  selectorFn: (reduxState: ReduxState) => ReturnType,
): RecoilValueReadOnly<ReturnType> => {
  selectorCount++;

  const wrappedSelector = selector<ReturnType>({
    key: `redux-to-recoil:selector:${selectorCount}${selectorFn.name}`,
    get: ({ get }) => {
      const reduxState = get(reduxStateAtom);
      return selectorFn(reduxState);
    },
  });

  return wrappedSelector;
};

export default selectorFromReselect;
