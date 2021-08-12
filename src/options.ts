import { ReadWriteSelectorOptions } from 'recoil';

export interface ReduxToRecoilOptions {
  /**
   * Controls whether Recoil (via `atomFromRedux`) will update its state each
   * time the Redux state updates.
   *
   * This should generally remain on in order for redux-to-recoil to work
   */
  readEnabled: boolean;
  /**
   * Controls whether setting a Recoil value (via `atomFromRedux`) will dispatch
   * a `SYNC_CHANGES_FROM_RECOIL` action to Redux. This will only work if the
   * root reducer for Redux is wrapped in `syncChangesFromRecoil`.
   */
  writeEnabled: boolean;
  /**
   * If writeEnabled is on, controls whether a `SYNC_CHANGES_FROM_RECOIL` action
   * is dispatched immediately and synchronously to Redux as soon as the Recoil
   * value is set, or whether it waits a tick to batch together multiple sets
   * into a single action.
   *
   * If you set one Recoil value at a time then this should generally be off,
   * so that Redux receives the updates immediately.
   * Or, if you set Recoil values en masse or in a loop then turning this on
   * may give performance improvements.
   */
  batchWrites: boolean;

  /**
   * Internal string used as the key for the Recoil atom that's used to hold
   * the Redux state.
   * Danger: changing this after initialization will likely break things.
   */
  _reduxStateAtomKey: string;
  /**
   * Internal string used as the key for the Recoil selectors used to access
   * values from the Redux state.
   * Danger: changing this after initialization will likely break things.
   */
  _recoilSelectorAtomKey: string;
  /**
   * Additional options passed to Recoil when constructing the selectors that
   * access Redux state values. This can be used to set experimental or
   * future options like Recoil's `cachePolicy_UNSTABLE`.
   * 'get' and 'set' are not honored.
   */
  _recoilSelectorExtraOptions: Partial<ReadWriteSelectorOptions<unknown>>;
}

const defaultOptions: Readonly<ReduxToRecoilOptions> = {
  readEnabled: true,
  writeEnabled: true,
  batchWrites: false,
  _reduxStateAtomKey: 'redux-to-recoil:state',
  _recoilSelectorAtomKey: 'redux-to-recoil:atom',
  _recoilSelectorExtraOptions: {},
};
if (process.env.NODE_ENV !== 'production') {
  Object.freeze(defaultOptions);
}

/**
 * `options` is just a simple singleton that holds the current, global options for redux-to-recoil.
 * You can update options with `setOptions` or by passing props to `<SyncReduxToCoil />`.
 * Mutating `options` directly also works, if you must.
 *
 * <SyncReduxToCoil writeEnabled={false} />
 * <SyncReduxToCoil batchWrites />
 *
 * setOptions({ writeEnabled: true });
 */
const options: ReduxToRecoilOptions = { ...defaultOptions };

/**
 * Updates redux-to-recoil's global options.
 */
const setOptions = (newOptions: Partial<ReduxToRecoilOptions>): ReduxToRecoilOptions => {
  if (process.env.NODE_ENV !== 'production') {
    Object.keys(newOptions).forEach((key) => {
      if (!Object.prototype.hasOwnProperty.call(options, key)) {
        console.warn(`SyncReduxToRecoil: Unrecognized option "${key}"`);
      }
    });
  }

  Object.assign(options, newOptions);
  return options;
};

export { defaultOptions, options, setOptions };
