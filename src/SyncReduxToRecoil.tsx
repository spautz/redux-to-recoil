import React, { Fragment } from 'react';

import { options, ReduxToRecoilOptions } from './options';
import { useSyncReduxToRecoil } from './useSyncReduxToRecoil';

export type SyncReduxToRecoilProps = Partial<ReduxToRecoilOptions>;

const SyncReduxToRecoil: React.FC<SyncReduxToRecoilProps> = (props) => {
  const { children, ...optionProps } = props;

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
