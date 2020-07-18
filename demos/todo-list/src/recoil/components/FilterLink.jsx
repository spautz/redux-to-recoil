import PropTypes from 'prop-types';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { VisibilityFilters } from '../../constants';
import { setVisibilityFilter } from '../../redux/actions';
import visibilityFilterSelector from '../../redux/selectors/visibilityFilterSelector';

const FilterLink = (props) => {
  const { children, filter } = props;
  const dispatch = useDispatch();

  const currentVisibilityFilter = useSelector(visibilityFilterSelector);
  const isActive = filter === currentVisibilityFilter;

  return (
    <button
      onClick={() => dispatch(setVisibilityFilter(filter))}
      disabled={isActive}
      style={{
        marginLeft: '4px',
      }}
    >
      {children}
    </button>
  );
};

FilterLink.propTypes = {
  children: PropTypes.node.isRequired,
  filter: PropTypes.oneOf(Object.values(VisibilityFilters)),
};

export default FilterLink;
