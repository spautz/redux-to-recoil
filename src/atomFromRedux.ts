import { RecoilState, selector } from 'recoil';

import { getReduxSourceAtom, getValueAtPath } from './util';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const atomFromRedux = <ReturnType = any>(namespace: string): RecoilState<ReturnType> => {
  // The leading dot is just a convention to make things easier to understand: empty parts are ignored
  const namespaceParts = namespace.split('.').filter((word) => !!word);

  // Although named "atomFromRedux", each instance is actually just a selector. They all pull from a single atom
  const selectorFromRedux = selector<ReturnType>({
    key: `redux-to-recoil:${namespaceParts.join('.')}`,
    get: ({ get }) => {
      const reduxSourceAtom = getReduxSourceAtom();
      const reduxState = get(reduxSourceAtom);
      return getValueAtPath(reduxState, namespaceParts);
    },
    set: ({ get, set }) => {
      console.log('TODO: Bidirectional support', namespace, { get, set });
    },
  });

  return selectorFromRedux;
};

export default atomFromRedux;
