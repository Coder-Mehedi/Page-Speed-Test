import { useCallback, useState, useEffect } from 'react';
import { getWindow, extend } from 'ssr-window';
const window = getWindow();

export function useLocalStorage(key: any, defaultValue: any) {
  return useStorage(key, defaultValue, window.localStorage);
}

export function useSessionStorage(key: any, defaultValue: any) {
  return useStorage(key, defaultValue, window.sessionStorage);
}

function useStorage(key: any, defaultValue: any, storageObject: any) {
  const [value, setValue] = useState(() => {
    const jsonValue = storageObject?.getItem(key);
    return jsonValue;
  });

  useEffect(() => {
    if (value === undefined) return storageObject.removeItem(key);
    storageObject.setItem(key, value);
  }, [key, value, storageObject]);

  const remove = useCallback(() => {
    setValue(undefined);
  }, []);

  return [value, setValue, remove];
}
