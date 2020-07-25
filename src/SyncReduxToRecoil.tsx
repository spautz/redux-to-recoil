import React, { useEffect } from 'react';

interface SyncReduxToRecoilProps {
  enabled?: boolean;
}

const SyncReduxToRecoil: React.FC<SyncReduxToRecoilProps> = (props) => {
  const { children, enabled } = props;

  // const reduxStore = useSt();

  useEffect(() => {
    console.log('SyncReduxToRecoil:useEffect');
  }, [enabled]);

  return <React.Fragment>{children}</React.Fragment>;
};

SyncReduxToRecoil.defaultProps = {
  enabled: true,
};

export default SyncReduxToRecoil;
