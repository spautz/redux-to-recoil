import { atom } from 'recoil';

const reduxStateAtom = atom({
  key: 'redux-to-recoil:state',
  default: null,
});

export default reduxStateAtom;
