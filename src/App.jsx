import { useEffect } from 'react';
import { createUserDocumentFromAuth, onAuthStateChangedListener } from './utils/firebase/firebase';
import { Routes, Route, useNavigate } from 'react-router';
import Layout from './components/layout/Layout';
import Home from './routes/home/Home';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentUser, setCurrentUser } from './features/user/userSlice';
import SignUp from './routes/sign-up/SignUp';
import GroupPage from './routes/group-page/GroupPage';
import { ImSpinner2 } from 'react-icons/im';

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(getCurrentUser);

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      if (user) {
        createUserDocumentFromAuth(user);
      } else {
        navigate('/');
      }
      dispatch(
        setCurrentUser(
          user === null ? null : { displayName: user.displayName, email: user.email, uid: user.uid }
        )
      );
    });

    return unsubscribe;
  }, []);

  return (
    <>
      {user === undefined ? (
        <ImSpinner2 className="spinner" />
      ) : (
        <Routes>
          <Route>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="sign-up" element={<SignUp />} />
              <Route path="groups/:groupId/*" element={<GroupPage />} />
            </Route>
          </Route>
        </Routes>
      )}
    </>
  );
}

export default App;
