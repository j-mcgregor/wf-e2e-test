// https://codesandbox.io/s/outside-alerter-hooks-lmr2y?module=/src/OutsideAlerter.js&file=/src/OutsideAlerter.js

import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

const useOutsideAlerter = (ref, action) => {
  useEffect(() => {
    const handleClickOutside = e => {
      if (ref.current && !ref.current.contains(e.target)) {
        action();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref]);
};

/**
 * Component that alerts if you click outside of it
 */
const OutsideAlerter = ({ children, action }) => {
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, action);

  return <div ref={wrapperRef}>{children}</div>;
};

OutsideAlerter.propTypes = {
  children: PropTypes.element.isRequired
};

export default OutsideAlerter;
