## Todo List demo

This demo project takes the ["Todo List" example from Redux](https://redux.js.org/basics/example) and uses
[Redux-to-Recoil](https://github.com/spautz/redux-to-recoil) to access the Redux state via Recoil.

There are three different implementations of the UI, running side-by-side:

- The original plain Redux version: read from Redux state, dispatch actions to Redux
- A Recoil state version: read from Recoil state, dispatch actions to Redux
- A bidirectional Recoil state version: read from Recoil state, write to Recoil state

This project was bootstrapped with [Create React ReduxApp](https://github.com/facebook/create-react-app).
