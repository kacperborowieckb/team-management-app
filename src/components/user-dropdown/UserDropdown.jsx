import { useEffect, useRef } from 'react';
import { ImSpinner2 } from 'react-icons/im';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { getCurrentUser, getUserStatus, signOutUser } from '../../features/user/userSlice';
import { ACTION_STATUS } from '../../utils/reducer/reducer.utils';
import Button from '../button/Button';
import './user-dropdown.scss';

const UserDropdown = ({ setIsUserDropdownOpen, profilePictureRef }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(getCurrentUser);
  const status = useSelector(getUserStatus);
  const dropdown = useRef();

  const closeDropdown = () => setIsUserDropdownOpen(false);
  const handleSignOut = () => {
    dispatch(signOutUser({ closeDropdown }));
  };

  const navigateToProfile = () => {
    navigate(`/user/${user.uid}`);
  };

  useEffect(() => {
    const handleClick = (e) => {
      if (!dropdown.current.contains(e.target) && e.target !== profilePictureRef) {
        closeDropdown();
      }
    };

    window.addEventListener('click', handleClick);

    return () => window.removeEventListener('click', handleClick);
  }, []);

  return (
    <section className="user-dropdown" ref={dropdown}>
      <section className="user-dropdown__info">
        <h3 className="user-dropdown__username">{user.displayName}</h3>
        <h4 className="user-dropdown__email">{user.email}</h4>
      </section>
      {status === ACTION_STATUS.PENDING ? (
        <Button buttonType="google" disabled>
          <ImSpinner2 className="spinner" />
        </Button>
      ) : (
        <>
          <Button handleOnClick={navigateToProfile}>My Profile</Button>
          <Button buttonType="google" handleOnClick={handleSignOut}>
            Sign Out
          </Button>
        </>
      )}
    </section>
  );
};

export default UserDropdown;
