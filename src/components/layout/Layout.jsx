import './layout.scss';
import Nav from '../nav/Nav';
import Header from '../header/Header';
import { Outlet } from 'react-router';
import { useSelector } from 'react-redux';
import { getCurrentUser } from '../../features/user/userSlice';
import { useState } from 'react';

const Layout = () => {
  const user = useSelector(getCurrentUser);
  const [isNavOpen, setIsNavOpen] = useState(false);

  const openNav = () => setIsNavOpen(true);
  const closeNav = () => setIsNavOpen(false);

  return (
    <>
      {user && <Nav isNavOpen={isNavOpen} closeNav={closeNav} />}
      <section className="layout">
        <Header openNav={openNav} />
        <Outlet />
      </section>
    </>
  );
};

export default Layout;
