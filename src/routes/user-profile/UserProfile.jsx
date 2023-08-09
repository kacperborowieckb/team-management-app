import Logo from '../../components/logo/Logo';
import UserInfo from '../../components/user-info/UserInfo';
import './user-profile.scss';

const UserProfile = () => {
  return (
    <section className="user-profile">
      <Logo />
      <UserInfo />
    </section>
  );
};

export default UserProfile;
