import { useEffect, useState } from 'react';

// A custom hook lets components use localStorage with React state.
export function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    const existingValue = localStorage.getItem(key);
    return existingValue ? JSON.parse(existingValue) : initialValue;
  });

  useEffect(() => {
    if (storedValue === null || storedValue === undefined) {
      localStorage.removeItem(key);
      return;
    }

    localStorage.setItem(key, JSON.stringify(storedValue));
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}
