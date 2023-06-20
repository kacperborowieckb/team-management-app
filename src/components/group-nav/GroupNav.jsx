import { Link, useLocation, useParams } from 'react-router-dom';
import { AiOutlineUserAdd } from 'react-icons/Ai';
import Button from '../button/Button';
import './group-nav.scss';

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
      <Button
        style={{
          padding: '0 0.75rem',
          display: 'flex',
          gap: '0.25rem',
          alignItems: 'center',
          marginRight: '5rem',
        }}
      >
        <AiOutlineUserAdd />
        Add User
      </Button>
    </section>
  );
};

export default GroupNav;
