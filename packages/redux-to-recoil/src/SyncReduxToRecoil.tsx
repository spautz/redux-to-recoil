import React, { Fragment } from 'react';

import { ReduxToRecoilOptions, setOptions } from './options';
import { useSyncReduxToRecoil } from './useSyncReduxToRecoil';

export type SyncReduxToRecoilProps = Partial<ReduxToRecoilOptions>;

/**
 * Core, required component for syncing changes from Redux to Recoil, and vice versa.
 *
 * This should be rendered within _both_ the Redux and Recoil providers. Do not wrap this around the rest of your app.
 */
const SyncReduxToRecoil: React.FC<SyncReduxToRecoilProps> = (props) => {
  const { children, ...optionProps } = props;

  setOptions(optionProps);
  useSyncReduxToRecoil();

  if (process.env.NODE_ENV !== 'production' && children) {
    console.warn(
      'Passing children to <SyncReduxToRecoil> is not recommended because they will rerender on *every* Redux change',
    );
  }

  return <Fragment>{children}</Fragment>;
};

export { SyncReduxToRecoil };
