import { RecoilState, atom } from 'recoil';

type ReduxState = unknown;
let reduxSourceAtom: RecoilState<ReduxState>;

const getReduxSourceAtom = (): typeof reduxSourceAtom => {
  if (__DEV__ && !reduxSourceAtom) {
    throw new Error('Cannot access redux state: SyncReduxToRecoil must be mounted');
  }
  return reduxSourceAtom;
};

const initializeReduxSourceAtom = (reduxState: ReduxState): void => {
  if (__DEV__ && !reduxSourceAtom) {
    throw new Error('Cannot set redux state: SyncReduxToRecoil is already mounted');
  }

  reduxSourceAtom = atom({
    key: '__redux-to-recoil',
    default: reduxState,
  });
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getValueAtPath = (state: ReduxState, pathParts: Array<string>): any => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let currentResult: any = state;
  let i = 0;
  while (currentResult && i < pathParts.length) {
    currentResult = currentResult[pathParts[i]];
    i++;
  }

  if (i === pathParts.length) {
    return currentResult;
  }
  return undefined;
};

export { getReduxSourceAtom, initializeReduxSourceAtom, getValueAtPath };
