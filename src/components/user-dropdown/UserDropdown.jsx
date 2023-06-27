import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentUser, signOutUser } from '../../features/user/userSlice';
import Button from '../button/Button';
import './user-dropdown.scss';

const UserDropdown = ({ setIsUserDropdownOpen, profilePictureRef }) => {
  const dispatch = useDispatch();
  const handleSignOut = () => dispatch(signOutUser());
  const user = useSelector(getCurrentUser);
  const dropdown = useRef();

  const closeDropdown = () => setIsUserDropdownOpen(false);

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
      <h3 className="user-dropdown__username">{user.displayName}</h3>
      <h4 className="user-dropdown__email">{user.email}</h4>
      <Button buttonType="google" handleOnClick={handleSignOut}>
        Sign Out
      </Button>
    </section>
  );
};

export default UserDropdown;
