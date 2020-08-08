## Todo List demo

This demo project takes the ["Todo List" example from Redux](https://redux.js.org/basics/example) and uses
[Redux-to-Recoil](https://github.com/spautz/redux-to-recoil) to access the Redux state via Recoil.

### What's included?

There are three different implementations of the UI, running side-by-side:

- The original plain Redux version: read from Redux, dispatch actions to Redux.
- A read-only Recoil version: read from Recoil, dispatch actions to Redux.
- A read-write Recoil version: read from Recoil, write to Recoil. The library syncs changes back to Redux.

### Comparison

## Reading from Redux

| Plain Redux  | Redux-to-Recoil: Read-only | Redux-to-Recoil: Read-write |
| ------------ | -------------------------- | --------------------------- |
| `test`       | Content Cell               | Same as Read-only           |
| Content Cell | Content Cell               | Same as Read-only           |

### Other notes

This project was bootstrapped with [Create React ReduxApp](https://github.com/facebook/create-react-app).
