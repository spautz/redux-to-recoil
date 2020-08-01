import { Store } from 'redux';

// This acts like a React ref, but it's not
const reduxStoreRef: { c: Store | null } = {
  c: null,
};

export default reduxStoreRef;
