import GroupsList from '../groups-list/GroupsList';
import './nav.scss';

const Nav = () => {
  return (
    <aside>
      <nav className="nav">
        <ul className="nav__list">
          <GroupsList content={'Your groups'} />
        </ul>
      </nav>
    </aside>
  );
};

export default Nav;
