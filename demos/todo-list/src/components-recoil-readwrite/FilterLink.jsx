import React from 'react';
import { useRecoilState } from 'recoil';
import { atomFromRedux } from 'redux-to-recoil';

const visibilityFilterAtom = atomFromRedux('.visibilityFilter');

const FilterLink = (props) => {
  const { children, filter } = props;

  const [currentFilter, setCurrentFilter] = useRecoilState(visibilityFilterAtom);

  return (
    <button
      onClick={() => setCurrentFilter(filter)}
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
