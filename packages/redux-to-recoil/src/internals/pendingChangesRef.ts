import { ChangeEntry } from './types.js';

// This acts like a React ref, but it's not
const pendingChangesRef: { c: Array<ChangeEntry> | null } = {
  c: null,
};

export { pendingChangesRef };
