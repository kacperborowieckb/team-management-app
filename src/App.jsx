import { useEffect } from 'react';
import { createUserDocumentFromAuth, onAuthStateChangedListener } from './utils/firebase/firebase';
import SignInPopup from './components/sign-in-popup/SignInPopup';
import { useSelector } from 'react-redux';
import { getCurrentUser } from './features/user/userSlice';

function App() {
  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      if (user) {
        createUserDocumentFromAuth(user);
      }
    });

    return unsubscribe;
  }, []);

  return (
    <>
      <SignInPopup />
    </>
  );
}

export default App;
