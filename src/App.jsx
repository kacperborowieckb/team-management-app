import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import {
  createUserDocumentFromAuth,
  onAuthStateChangedListener,
  signOutUser,
} from './utils/firebase/firebase';
import SignInPopup from './components/sign-in-popup/SignInPopup';

function App() {
  const dispatch = useDispatch();

  const handleGoogleSignUp = async () => {
    try {
      dispatch(logInUser());
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      if (user) {
        createUserDocumentFromAuth(user);
      }
    });

    return unsubscribe;
  }, []);

  const logOut = () => {
    signOutUser();
  };

  return (
    <>
      <SignInPopup />
      <button onClick={handleGoogleSignUp} style={{ backgroundColor: 'red' }}>
        GOOGLE
      </button>
      <button onClick={logOut}>LOG OUT</button>
    </>
  );
}

export default App;
