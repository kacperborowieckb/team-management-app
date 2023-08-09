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
import { Link, useParams } from 'react-router-dom';
import Notifications from '../notifications/Notifications';
import { useRef, useState } from 'react';
import UserDropdown from '../user-dropdown/UserDropdown';
import { GiHamburgerMenu } from 'react-icons/gi';

const Header = ({ openNav }) => {
  const dispatch = useDispatch();
  const isSignInPopupOpen = useSelector(getIsSignInPopupOpen);
  const user = useSelector(getCurrentUser);
  const { groupId } = useParams();
  const currentGroup = useSelector((state) => state.groups.groups.find(({ id }) => id === groupId));
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const profilePicture = useRef();

  const handleOpenSignInPopup = () => dispatch(toogleSignInPopup(true));
  const handleToogleUserDropdown = () => setIsUserDropdownOpen(!isUserDropdownOpen);

  return (
    <header className="header">
      {user && <GiHamburgerMenu className="header__hamburger" onClick={openNav} />}
      <section className="header__logo-container">
        <Link to={'/'}>
          <h1 className="header__logo">TM</h1>
        </Link>
      </section>
      {currentGroup && (
        <section className="header__group-name-container">
          <h1 className="header__group-name">{currentGroup.name}</h1>
        </section>
      )}
      {user ? (
        <section className="header__user-section">
          <Notifications />
          <p className="header__user-name">{user.displayName}</p>
          <section className="header__profile-picture-container">
            <img
              src={`${user && user.url.length > 0 ? user.url : '/profile-picture.svg'}`}
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
        </section>
      ) : (
        <Button
          buttonType="signIn"
          handleOnClick={handleOpenSignInPopup}
          style={{ paddingRight: '1rem', gridColumn: '3', justifySelf: 'flex-end' }}
        >
          Sign In
        </Button>
      )}
      {isSignInPopupOpen && <SignInPopup />}
    </header>
  );
};

export default Header;
