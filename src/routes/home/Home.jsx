import { useSelector } from 'react-redux';
import GroupsList from '../../components/groups-list/GroupsList';
import WelcomeMessage from '../../components/welcome-message/WelcomeMessage';
import { getCurrentUser } from '../../features/user/userSlice';
import './home.scss';

const Home = () => {
  const user = useSelector(getCurrentUser);
  return (
    <main className="home">
      {user === null ? (
        <WelcomeMessage />
      ) : (
        <GroupsList content={'Select one of your groups'} forceOpen={true} />
      )}
    </main>
  );
};

export default Home;
