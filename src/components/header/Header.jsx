import { useSelector } from 'react-redux';
import {
  getCurrentUser,
  getIsSignInPopupOpen,
  toogleSignInPopup,
  signOutUser,
} from '../../features/user/userSlice';
import Button from '../button/Button';
import SignInPopup from '../sign-in-popup/SignInPopup';
import './header.scss';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

const Header = () => {
  const dispatch = useDispatch();
  const isSignInPopupOpen = useSelector(getIsSignInPopupOpen);
  const user = useSelector(getCurrentUser);

  const handleOpenSignInPopup = () => dispatch(toogleSignInPopup(true));

  const handleSignOut = () => dispatch(signOutUser());

  return (
    <header className="header">
      {user ? (
        <Button type="signIn" handleOnClick={handleSignOut}>
          Sign Out
        </Button>
      ) : (
        <Button
          type="signIn"
          handleOnClick={handleOpenSignInPopup}
          style={{ paddingRight: '2rem' }}
        >
          Sign In
        </Button>
      )}
      {isSignInPopupOpen && <SignInPopup />}
      {user && (
        <Link to={'/'} className="header_img">
          <img src="/profile-picture.png" alt="profile-picture" />
        </Link>
      )}
    </header>
  );
};

export default Header;
