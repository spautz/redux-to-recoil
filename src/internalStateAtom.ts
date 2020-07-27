import { atom } from 'recoil';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const internalStateAtom = atom<any>({
  key: 'redux-to-recoil:state',
  default: null,
});

export default internalStateAtom;
