import * as React from 'react';

export default function useDebounceDeepCompare<T>(value: T, delay: number = 5000) {
  const [debouncedValue, setDebouncedValue] = React.useState(value);
  const previousValue = React.useRef(value);

  React.useEffect(() => {
    if (JSON.stringify(value) !== JSON.stringify(previousValue.current)) {
      const timer = setTimeout(() => {
        setDebouncedValue(value);
        previousValue.current = value;
      }, delay);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [value, delay]);
  return debouncedValue;
}
