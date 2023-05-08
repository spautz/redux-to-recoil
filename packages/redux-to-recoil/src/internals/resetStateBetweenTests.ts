import { defaultOptions, options } from '../options.js';

const { _recoilSelectorAtomKey, _reduxStateAtomKey } = defaultOptions;

let counter = 0;

const resetStateBetweenTests = (): void => {
  counter++;
  Object.assign(options, {
    _recoilSelectorAtomKey: `${_recoilSelectorAtomKey}${counter}`,
    _reduxStateAtomKey: `${_reduxStateAtomKey}${counter}`,
  });
};

export { resetStateBetweenTests };
