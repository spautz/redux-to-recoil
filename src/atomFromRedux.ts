import { get as getPath } from '@ngard/tiny-get';
import { RecoilState, selector } from 'recoil';

import internalStateAtom from './internalStateAtom';
import { DefaultReturnType } from './types';

const atomSelectorCache = Object.create(null);
const { hasOwnProperty } = Object.prototype;

// This works similarly to Recoil's atomFamily/selectorFamily, except we de-dupe things by path, and don't keep
// old selectors around for forever.
const atomFromRedux = <ReturnType = DefaultReturnType>(path: string): RecoilState<ReturnType> => {
  // The leading dot is just a convention to make things easier to read
  const realPath = path.charAt(0) === '.' ? path.substr(1) : path;

  if (!hasOwnProperty.call(atomSelectorCache, realPath)) {
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

    atomSelectorCache[realPath] = selectorForPath;
  }

  return atomSelectorCache[realPath];
};

export default atomFromRedux;
