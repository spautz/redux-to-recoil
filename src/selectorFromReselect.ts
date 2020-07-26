import { RecoilValueReadOnly, selector } from 'recoil';

import { reduxStateAtom } from './internals';

let count = 0;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const selectorFromReselect = <ReturnType = any>(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  selectorFn: (reduxState: any) => ReturnType,
): RecoilValueReadOnly<ReturnType> => {
  count++;

  const wrappedSelector = selector<ReturnType>({
    key: `redux-to-recoil:selector:${count}${selectorFn.name}`,
    get: ({ get }) => {
      const reduxState = get(reduxStateAtom);
      const value = selectorFn(reduxState);
      return value;
    },
  });

  return wrappedSelector;
};

export default selectorFromReselect;
