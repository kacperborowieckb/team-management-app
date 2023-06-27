import { useEffect } from 'react';

export const useClickToClose = (ref, closeHandler) => {
  useEffect(() => {
    const checkForClickOutside = (e) => {
      if (ref.current === e.target) {
        closeHandler();
      }
    };

    window.addEventListener('click', checkForClickOutside);

    return () => window.removeEventListener('click', checkForClickOutside);
  }, []);
};
