import { atom, RecoilState } from 'recoil';

import { ReduxState } from './types';
import { options } from '../options.js';

let reduxStateAtom: RecoilState<ReduxState>;
let lastKey: string;

/**
 * The entire redux state is stored in an atom, which keys are then selected from.
 * This returns that atom.
 */
const getReduxStateAtom = (): RecoilState<ReduxState> => {
  if (!reduxStateAtom || options._reduxStateAtomKey !== lastKey) {
    reduxStateAtom = atom<ReduxState>({
      key: options._reduxStateAtomKey,
      default: null,
    });
    lastKey = options._reduxStateAtomKey;
  }
  return reduxStateAtom;
};

export { getReduxStateAtom };
