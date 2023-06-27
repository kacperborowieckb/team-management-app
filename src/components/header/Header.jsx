import { useSelector } from 'react-redux';
import {
  getCurrentUser,
  getIsSignInPopupOpen,
  toogleSignInPopup,
} from '../../features/user/userSlice';
import Button from '../button/Button';
import SignInPopup from '../sign-in-popup/SignInPopup';
import './header.scss';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Notifications from '../notifications/Notifications';
import { useRef, useState } from 'react';
import UserDropdown from '../user-dropdown/UserDropdown';

const Header = () => {
  const dispatch = useDispatch();
  const isSignInPopupOpen = useSelector(getIsSignInPopupOpen);
  const user = useSelector(getCurrentUser);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const profilePicture = useRef();

  const handleOpenSignInPopup = () => dispatch(toogleSignInPopup(true));
  const handleToogleUserDropdown = () => setIsUserDropdownOpen(!isUserDropdownOpen);

  return (
    <header className="header">
      <section className="header__logo-container">
        <Link to={'/'}>
          <h1 className="header__logo">TM</h1>
        </Link>
      </section>

      {user ? (
        <>
          <Notifications />
          <p className="header__user-name">{user.displayName}</p>
          <section className="header__profile-picture-container">
            <img
              src="/profile-picture.png"
              alt="profile-picture"
              className="header__profile-picture"
              onClick={handleToogleUserDropdown}
              ref={profilePicture}
            />
            {isUserDropdownOpen && (
              <UserDropdown
                setIsUserDropdownOpen={setIsUserDropdownOpen}
                profilePictureRef={profilePicture.current}
              />
            )}
          </section>
        </>
      ) : (
        <Button
          buttonType="signIn"
          handleOnClick={handleOpenSignInPopup}
          style={{ paddingRight: '2rem' }}
        >
          Sign In
        </Button>
      )}
      {isSignInPopupOpen && <SignInPopup />}
    </header>
  );
};

export default Header;
