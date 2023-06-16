import NavListItem from '../nav-list-item/NavListItem';
import './nav.scss';

const Nav = () => {
  return (
    <aside>
      <nav className="nav">
        <ul className="nav__list">
          <NavListItem content={'tasks'} />
          <NavListItem content={'calendar'} />
          <NavListItem content={'chat'} />
        </ul>
      </nav>
    </aside>
  );
};

export default Nav;
