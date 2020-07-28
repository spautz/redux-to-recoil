import { atom } from 'recoil';

import { ReduxState } from './types';

const internalStateAtom = atom<ReduxState>({
  key: 'redux-to-recoil:state',
  default: null,
});

export default internalStateAtom;
