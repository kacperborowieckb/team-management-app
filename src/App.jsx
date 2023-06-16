import { useEffect } from 'react';
import { createUserDocumentFromAuth, onAuthStateChangedListener } from './utils/firebase/firebase';
import { Routes, Route } from 'react-router';
import Layout from './components/layout/Layout';
import Home from './routes/home/Home';
import { useDispatch } from 'react-redux';
import { setCurrentUser } from './features/user/userSlice';
import SignUp from './routes/sign-up/SignUp';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      if (user) {
        createUserDocumentFromAuth(user);
      }
      dispatch(setCurrentUser(user));
    });

    return unsubscribe;
  }, []);

  return (
    <Routes>
      <Route>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="sign-up" element={<SignUp />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
