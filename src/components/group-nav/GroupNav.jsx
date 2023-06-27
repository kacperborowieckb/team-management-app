import { Link, Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
import './group-nav.scss';
import AddUser from '../add-user/AddUser';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUserGroup } from '../../features/groups/groupsSlice';

const GroupNav = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { groupId } = useParams();
  const { pathname } = useLocation();
  const currentGroup = useSelector((state) => state.groups.groups.find(({ id }) => id === groupId));
  const activePage = pathname.split('/').at(-1) || null;

  const navigateToHome = () => navigate('/');

  const handleDeleteGroup = () => dispatch(deleteUserGroup({ groupId, navigateToHome }));

  return (
    <>
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
        {currentGroup && currentGroup.admin === true && (
          <>
            <AddUser />
            <div onClick={handleDeleteGroup} style={{ color: 'black' }}>
              DeleteGroup
            </div>
          </>
        )}
      </section>
      <Outlet />
    </>
  );
};

export default GroupNav;
