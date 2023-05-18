import { ChangeEntry } from './types.js';

const SYNC_CHANGES_FROM_RECOIL = 'SYNC_CHANGES_FROM_RECOIL';

export interface SyncFromRecoilAction {
  type: typeof SYNC_CHANGES_FROM_RECOIL;
  payload: Array<ChangeEntry>;
}

const syncChangesFromRecoilAction = (changes: Array<ChangeEntry>): SyncFromRecoilAction => ({
  type: SYNC_CHANGES_FROM_RECOIL,
  payload: changes,
});

export { SYNC_CHANGES_FROM_RECOIL, syncChangesFromRecoilAction };
