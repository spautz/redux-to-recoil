import { set as setPath } from 'immutable-path/dist/immutable-object-path';

import { ChangeEntry, ReduxState } from './types';

const applyChangesToState = (state: ReduxState, changes: Array<ChangeEntry>): ReduxState => {
  let newState = state;
  for (let i = 0; i < changes.length; i++) {
    const [path, value] = changes[i];
    if (path) {
      newState = setPath(newState, path, value);
    } else {
      newState = value;
    }
  }

  return newState;
};

export default applyChangesToState;
