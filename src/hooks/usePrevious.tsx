import { useEffect, useRef } from "react";

function usePrevious(value) {
  // The ref object is a generic container whose current property is mutable ...
  // ... and can hold any value, similar to an instance property on a class
  const reference = useRef();

  // Store current value in ref
  useEffect(() => {
    reference.current = value;
  }, [value]); // Only re-run if value changes

  // Return previous value (happens before update in useEffect above)
  return reference.current;
}
export default usePrevious;
