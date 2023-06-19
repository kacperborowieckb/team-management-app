import { useSelector } from 'react-redux';
import WelcomeMessage from '../../components/welcome-message/WelcomeMessage';
import { getCurrentUser } from '../../features/user/userSlice';
import './home.scss';

const Home = () => {
  const user = useSelector(getCurrentUser);
  return <main className="home">{user === null ? <WelcomeMessage /> : <h2>Pick group</h2>}</main>;
};

export default Home;
