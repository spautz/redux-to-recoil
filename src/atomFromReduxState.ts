import { useSelector } from 'react-redux';
import { RecoilState, atom, selector } from 'recoil';

const atomFromReduxState = <ReturnType = any>(namespace: string): RecoilState<ReturnType> => {
  // The leading dot is just a convention to make things easier to understand: empty parts are ignored
  const namespaceParts = namespace.split('.').filter((word) => !!word);

  console.log('atomFromReduxState()', namespace);

  // @typescript-eslint/no-explicit-any
  const reduxSelector = (state: any) => {
    let currentResult = state;
    let i = 0;
    while (currentResult && i < namespaceParts.length) {
      currentResult = currentResult[namespaceParts[i]];
      i++;
    }

    if (i === namespaceParts.length) {
      return currentResult;
    }
    return undefined;
  };

  const fakeAtomBehindSelector = atom({ key: 'plain', default: 'plain' });
  console.log('plainAtom: ', plainAtom);

  const selectorForAtom = selector<ReturnType>({
    key: `redux-to-recoil:${namespaceParts.join('.')}`,
    get: ({ get }: any) => {
      get(fakeAtomBehindSelector);
      console.log('INSIDE selectorForAtom.get()!!');
      return useSelector(reduxSelector);
    },
    set: (...args: any) => {
      console.log('INSIDE selectorForAtom.set()!!', ...args);
    },
  });

  return selectorForAtom;

  // return (...args) => {
  //   console.log('Atom called!!!', ...args);
  //   return useSelector(reduxSelector);
  // };
};

export default atomFromReduxState;
