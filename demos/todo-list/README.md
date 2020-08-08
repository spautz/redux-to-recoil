## Todo List demo

This demo project takes the ["Todo List" example from Redux](https://redux.js.org/basics/example) and uses
[Redux-to-Recoil](https://github.com/spautz/redux-to-recoil) to access the Redux state via Recoil.

### What's included?

There are three different implementations of the UI, running side-by-side:

- The original plain Redux version: read from Redux, dispatch actions to Redux.
- A read-only Recoil version: read from Recoil, dispatch actions to Redux.
- A read-write Recoil version: read from Recoil, write to Recoil. The library syncs changes back to Redux.

### Comparison

| Plain Redux                                                                                                     | Redux-to-Recoil: Read-only                                                                                      | Redux-to-Recoil: Read-write                                                                                                           |
| --------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| [VisibleTodoList.jsx](./src/components-redux/VisibleTodoList.jsx)                                               | [VisibleTodoList.jsx](./src/components-recoil-readonly/VisibleTodoList.jsx)                                     | [VisibleTodoList.jsx](./src/components-recoil-readwrite/VisibleTodoList.jsx)                                                          |
| To read:<br><sub>`const selector = (state) => state.someKey;`<br>`const myValue = useSelector(selector);`</sub> | To read:<br><sub>`const myAtom = atomFromRedux('.someKey');`<br>`const myValue = useRecoilValue(myAtom);`</sub> | Same as Read-only:<br><sub>`const myAtom = atomFromRedux('.someKey');`<br>`const myValue = useRecoilValue(myAtom);`</sub>             |
| To write:<br><sub>`const myAction = someActionConstructor(value);`<br>`dispatch(myAction);`</sub>               |                                                                                                                 | To write:<br><sub>`const myAtom = atomFromRedux('.someKey');`<br>`const setValue = useSetRecoilValue(myAtom);`</sub>                  |
|                                                                                                                 |                                                                                                                 | To read and write:<br><sub>`const myAtom = atomFromRedux('.someKey');`<br>`const [myValue, setValue] = useRecoilState(myAtom);`</sub> |

### Other notes

This project was bootstrapped with [Create React ReduxApp](https://github.com/facebook/create-react-app).
