import './layout.scss';
import Nav from '../nav/Nav';
import Header from '../header/Header';
import { Outlet } from 'react-router';

const Layout = () => {
  return (
    <>
      <Nav />
      <section style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
        <Header />
        <Outlet />
      </section>
    </>
  );
};

export default Layout;
