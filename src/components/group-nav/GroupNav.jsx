import { Link, useLocation, useParams } from 'react-router-dom';
import './group-nav.scss';
import AddUser from '../add-user/AddUser';

const GroupNav = () => {
  const { groupId } = useParams();
  const { pathname } = useLocation();
  const activePage = pathname.split('/').at(-1) || null;

  return (
    <section className="group-nav">
      <section className="group-nav__container">
        <Link
          to={`/groups/${groupId}/tasks`}
          className={`group-nav__link ${activePage === 'tasks' && 'group-nav__link-active'}`}
        >
          Tasks
        </Link>
        <Link
          to={`/groups/${groupId}/calendar`}
          className={`group-nav__link ${activePage === 'calendar' && 'group-nav__link-active'}`}
        >
          Calendar
        </Link>
        <Link
          to={`/groups/${groupId}/chat`}
          className={`group-nav__link ${activePage === 'chat' && 'group-nav__link-active'}`}
        >
          Chat
        </Link>
      </section>
      <AddUser />
    </section>
  );
};

export default GroupNav;