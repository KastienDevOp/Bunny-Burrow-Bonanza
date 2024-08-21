import { useEffect, useRef } from 'react';

const useAutoSave = (data, saveFunction, interval = 30000) => {
  const savedData = useRef(data);

  useEffect(() => {
    const timer = setInterval(() => {
      if (JSON.stringify(data) !== JSON.stringify(savedData.current)) {
        saveFunction(data);
        savedData.current = data;
      }
    }, interval);

    return () => clearInterval(timer);
  }, [data, saveFunction, interval]);
};

export default useAutoSave;