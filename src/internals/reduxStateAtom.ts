import { atom } from 'recoil';

import { ReduxState } from './types';

const reduxStateAtom = atom<ReduxState>({
  key: 'redux-to-recoil:state',
  default: null,
});

export default reduxStateAtom;
