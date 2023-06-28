import { Link, Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
import './group-nav.scss';
import AddUser from '../add-user/AddUser';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUserGroup } from '../../features/groups/groupsSlice';
import Button from '../button/Button';
import OptionsPopup from '../options-popup/OptionsPopup';
import AddUserPopup from '../add-user-popup/AddUserPopup';
import { useState } from 'react';

const GroupNav = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { groupId } = useParams();
  const { pathname } = useLocation();
  const currentGroup = useSelector((state) => state.groups.groups.find(({ id }) => id === groupId));
  const activePage = pathname.split('/').at(-1) || null;
  const [isPopUpOpen, setIsPopUpOpen] = useState(false);

  const toogleAddUserPopup = () => setIsPopUpOpen(!isPopUpOpen);

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
          <OptionsPopup className="group-nav__options" style={{ top: '0', right: '150%' }}>
            <AddUser toogleAddUserPopup={toogleAddUserPopup} />
            <Button onClick={handleDeleteGroup} buttonType="option-with-accept">
              DeleteGroup
            </Button>
          </OptionsPopup>
        )}
        {isPopUpOpen && (
          <AddUserPopup toogleAddUserPopup={toogleAddUserPopup} setIsPopUpOpen={setIsPopUpOpen} />
        )}
      </section>
      <Outlet />
    </>
  );
};

export default GroupNav;
