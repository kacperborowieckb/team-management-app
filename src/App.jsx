import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import {
  createUserDocumentFromAuth,
  onAuthStateChangedListener,
  signInWithGooglePopup,
  signOutUser,
} from './utils/firebase/firebase';
import { logInUser } from './features/user/userSlice';

function App() {
  const dispatch = useDispatch();
  const handleGoogleSignUp = async () => {
    dispatch(logInUser());
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      console.log(user);
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
      <div>cos</div>
      <button onClick={handleGoogleSignUp} style={{ backgroundColor: 'red' }}>
        GOOGLE
      </button>
      <button onClick={logOut}>LOG OUT</button>
    </>
  );
}

export default App;
