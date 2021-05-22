type ConsoleErrorFn = typeof console.error;

/**
 * Recoil 0.3 regularly emits an error during unit tests:
 * ["Did not retain recoil value on render, or committed after timeout elapsed. This is fine, but odd.", undefined]
 *
 * This only happens during tests, and does not affect the library or its usage, so for now it's suppressed.
 *
 * https://github.com/facebookexperimental/Recoil/issues/1034
 */
const suppressRecoilValueWarning = (consoleErrorFn: unknown = console.error): ConsoleErrorFn => {
  const mockedFn = (...args: Array<unknown>) => {
    if (
      args[0] !==
        'Did not retain recoil value on render, or committed after timeout elapsed. This is fine, but odd.' &&
      args[1] == null
    ) {
      return (consoleErrorFn as ConsoleErrorFn)(...args);
    }
  };

  return mockedFn;
};

export { suppressRecoilValueWarning };
