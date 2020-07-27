import { atom } from 'recoil';

const internalStateAtom = atom({
  key: 'redux-to-recoil:state',
  default: null,
});

export default internalStateAtom;
