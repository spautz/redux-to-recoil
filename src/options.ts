export interface ReduxToRecoilOptions {
  readEnabled: boolean;
  writeEnabled: boolean;
  batchWrites: boolean;
}

// This is just a simple singleton for holding these options.
// Setting props on `<SyncReduxToCoil />` is the preferred way to set them,
// but you can mutate this object directly if desired.
export const options: ReduxToRecoilOptions = {
  readEnabled: true,
  writeEnabled: true,
  batchWrites: false,
};
