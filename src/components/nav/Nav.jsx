import GroupsList from '../groups-list/GroupsList';
import './nav.scss';
import { AiOutlineClose } from 'react-icons/ai';

const Nav = ({ isNavOpen, closeNav }) => {
  return (
    <aside className="nav" style={{ left: isNavOpen && '0%' }}>
      <nav className="nav__container">
        <AiOutlineClose className="nav__close-icon" onClick={closeNav} />
        <ul className="nav__list">
          <GroupsList content={'Your groups'} />
        </ul>
      </nav>
    </aside>
  );
};

export default Nav;
