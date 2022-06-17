import React from 'react';

export default function useCombinedRefs<T>(
  innerRef: React.MutableRefObject<T | null>,
  fwdRef: React.ForwardedRef<T>
) {
  React.useEffect(() => {
    [innerRef, fwdRef].forEach(ref => {
      if (ref) {
        if (typeof ref === 'function') {
          ref(innerRef.current || null);
        } else {
          ref.current = innerRef.current || null;
        }
      }
    });
  }, [innerRef, fwdRef]);
  return innerRef;
}
