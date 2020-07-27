import getPath from 'lodash/get';
import { RecoilState, selector } from 'recoil';
import { LimitedCache } from 'limited-cache';

import internalStateAtom from './internalStateAtom';

const atomSelectorCache = LimitedCache();

// This works similarly to Recoil's atomFamily/selectorFamily, except we de-dupe things by path, and don't keep
// old selectors around for forever.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const atomFromRedux = <ReturnType = any>(path: string): RecoilState<ReturnType> => {
  // The leading dot is just a convention to make things easier to read
  const realPath = path.charAt(0) === '.' ? path.substr(1) : path;

  if (!atomSelectorCache.has(realPath)) {
    console.log('creating selector for path: ', realPath);

    // Although named "atomFromRedux", each instance is actually just a selector. They all pull from a single atom.
    const selectorForPath = selector<ReturnType>({
      key: `redux-to-recoil:atom:${realPath}`,
      get: ({ get }) => {
        const reduxState = get(internalStateAtom);
        if (realPath) {
          return getPath(reduxState, realPath);
        }
        return reduxState;
      },
      set: ({ get, set }, newValue) => {
        console.log('TODO: Bidirectional support', realPath, { get, set }, newValue);
      },
    });

    atomSelectorCache.set(realPath, selectorForPath);
  }

  return atomSelectorCache.get(realPath);
};

export default atomFromRedux;
