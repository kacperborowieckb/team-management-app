import { Link } from 'react-router-dom';
import './logo.scss';

const Logo = () => {
  return (
    <Link to={'/'}>
      <h1 className="logo">TM</h1>
    </Link>
  );
};

export default Logo;
