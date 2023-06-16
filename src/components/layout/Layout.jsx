import './layout.scss';
import Nav from '../nav/Nav';
import Header from '../header/Header';
import { Outlet } from 'react-router';
import { useSelector } from 'react-redux';
import { getCurrentUser } from '../../features/user/userSlice';

const Layout = () => {
  const user = useSelector(getCurrentUser);

  return (
    <>
      {user && <Nav />}
      <section style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
        <Header />
        <Outlet />
      </section>
    </>
  );
};

export default Layout;
