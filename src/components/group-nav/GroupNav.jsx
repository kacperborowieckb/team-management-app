import { Link, Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
import './group-nav.scss';
import AddUser from '../add-user/AddUser';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUserGroup, getGroupsStatus } from '../../features/groups/groupsSlice';
import Button from '../button/Button';
import OptionsPopup from '../options-popup/OptionsPopup';
import AddUserPopup from '../add-user-popup/AddUserPopup';
import { useState } from 'react';
import Popup from '../popup/Popup';
import { ImSpinner2 } from 'react-icons/im';
import { ACTION_STATUS } from '../../utils/reducer/reducer.utils';

const GroupNav = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const status = useSelector(getGroupsStatus);
  const { groupId } = useParams();
  const { pathname } = useLocation();
  const currentGroup = useSelector((state) => state.groups.groups.find(({ id }) => id === groupId));
  const activePage = pathname.split('/').at(-1) || null;
  const [isPopUpOpen, setIsPopUpOpen] = useState(false);
  const [isAcceptDeleteGroupOpen, setIsAcceptDeleteGroupOpen] = useState(false);

  const toogleAddUserPopup = () => setIsPopUpOpen(!isPopUpOpen);

  const navigateToHome = () => navigate('/');
  const toogleAcceptDeleteGroup = () => setIsAcceptDeleteGroupOpen(!isAcceptDeleteGroupOpen);
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
            <Button onClick={toogleAcceptDeleteGroup} buttonType="option-with-accept">
              DeleteGroup
            </Button>
          </OptionsPopup>
        )}
        {isAcceptDeleteGroupOpen && (
          <Popup heading="Delete group" handleClosePopUp={toogleAcceptDeleteGroup}>
            <p className="group-nav__accept-popup-paragraph">
              Are you sure you want to delete this group?
            </p>
            <section className="group-nav__accept-popup-buttons">
              <Button buttonType="decline" handleOnClick={toogleAcceptDeleteGroup}>
                No
              </Button>
              {status === ACTION_STATUS.PENDING ? (
                <Button buttonType="accept">
                  <ImSpinner2 className="spinner" />
                </Button>
              ) : (
                <Button buttonType="accept" handleOnClick={handleDeleteGroup}>
                  Yes
                </Button>
              )}
            </section>
          </Popup>
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
