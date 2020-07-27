import React from 'react';
import { useDispatch } from 'react-redux';
import { useRecoilValue } from 'recoil';
import { atomFromRedux } from 'redux-to-recoil';

import { setVisibilityFilter } from '../actions';

const visibilityFilterAtom = atomFromRedux('.visibilityFilter');

const FilterLink = (props) => {
  const { children, filter } = props;
  const dispatch = useDispatch();

  const currentFilter = useRecoilValue(visibilityFilterAtom);

  return (
    <button
      onClick={() => dispatch(setVisibilityFilter(filter))}
      disabled={filter === currentFilter}
      style={{
        marginLeft: '4px',
      }}
    >
      {children}
    </button>
  );
};

export default FilterLink;
