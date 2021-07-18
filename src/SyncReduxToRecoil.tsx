import React, { Fragment } from 'react';

import { ReduxToRecoilOptions, options } from './options';
import { useSyncReduxToRecoil } from './useSyncReduxToRecoil';

export type SyncReduxToRecoilProps = Partial<ReduxToRecoilOptions>;

const SyncReduxToRecoil: React.FC<SyncReduxToRecoilProps> = (props) => {
  const { children, ...optionProps } = props;

  // If any values are passed via props, sync them as options
  if (process.env.NODE_ENV !== 'production') {
    Object.keys(optionProps).forEach((key) => {
      if (!Object.prototype.hasOwnProperty.call(options, key)) {
        console.warn(`SyncReduxToRecoil: Unrecognized option "${key}"`);
      }
    });
  }
  Object.assign(options, optionProps);

  useSyncReduxToRecoil();

  if (process.env.NODE_ENV !== 'production' && children) {
    console.warn(
      'Passing children to <SyncReduxToRecoil> is not recommended because they will rerender on *every* Redux change',
    );
  }

  return <Fragment>{children}</Fragment>;
};

export { SyncReduxToRecoil };
