import { useSelector } from 'react-redux';
import WelcomeMessage from '../../components/welcome-message/WelcomeMessage';
import { getCurrentUser } from '../../features/user/userSlice';
import './home.scss';

const Home = () => {
  const user = useSelector(getCurrentUser);
  return <main className="home">{!user && <WelcomeMessage />}</main>;
};

export default Home;
