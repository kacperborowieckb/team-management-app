import { useEffect } from 'react';
import {
  createUserDocumentFromAuth,
  getUserProfileUrl,
  onAuthStateChangedListener,
} from './utils/firebase/firebase';
import { Routes, Route, useNavigate } from 'react-router';
import Layout from './components/layout/Layout';
import Home from './routes/home/Home';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentUser, setCurrentUser } from './features/user/userSlice';
import SignUp from './routes/sign-up/SignUp';
import GroupPage from './routes/group-page/GroupPage';
import { ImSpinner2 } from 'react-icons/im';
import UserProfile from './routes/user-profile/UserProfile';

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(getCurrentUser);

  const setUser = async (user) => {
    if (user) {
      const url = await getUserProfileUrl(user.uid);
      dispatch(
        setCurrentUser({
          displayName: user.displayName,
          email: user.email,
          uid: user.uid,
          url: url || '',
        })
      );
    } else {
      dispatch(setCurrentUser(null));
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener(async (user) => {
      if (user) {
        await createUserDocumentFromAuth(user);
      } else {
        navigate('/');
      }

      setUser(user);
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
            <Route path="user/:uid" element={<UserProfile />} />
          </Route>
        </Routes>
      )}
    </>
  );
}

export default App;
