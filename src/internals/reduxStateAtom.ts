import { atom, RecoilState } from 'recoil';

import { ReduxState } from './types';
import { options } from '../options';

let reduxStateAtom: RecoilState<ReduxState>;
let lastKey: string;

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
