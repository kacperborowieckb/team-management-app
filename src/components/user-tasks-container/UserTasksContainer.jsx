import Button from '../button/Button';
import './user-tasks-container.scss';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addNewTask } from '../../features/tasks/tasksSlice';
import { useParams } from 'react-router';
import AddTaskPopup from '../add-task-popup/AddTaskPopup';
import {
  getCurrentGroupUsers,
  getGroupsError,
  getGroupsStatus,
  removeUserFromGroup,
  setAdminPermissions,
} from '../../features/groups/groupsSlice';
import { getCurrentUser } from '../../features/user/userSlice';
import OptionsPopup from '../options-popup/OptionsPopup';
import UserTasks from '../user-tasks/UserTasks';
import RemoveUserPopup from '../remove-user-popup/RemoveUserPopup';
import { ACTION_STATUS } from '../../utils/reducer/reducer.utils';
import { ImSpinner2 } from 'react-icons/im';

const UserTasksContainer = ({ displayName, tasks, uid, admin }) => {
  const dispatch = useDispatch();
  const { groupId } = useParams();
  const user = useSelector(getCurrentUser);
  const currentGroupUsers = useSelector(getCurrentGroupUsers);
  const status = useSelector(getGroupsStatus);
  const error = useSelector(getGroupsError);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [taskColor, setTaskColor] = useState('var(--clr-main-700)');
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isRemoveUserPopupOpen, setIsRemoveUserPopupOpen] = useState(false);
  const [isQuitGroupPopupOpen, setIsQuitGroupPopupOpen] = useState(false);

  const toogleAddTaskPopUp = () => setIsPopupOpen(!isPopupOpen);
  const toogleAcceptRemoveUser = () => setIsRemoveUserPopupOpen(!isRemoveUserPopupOpen);
  const toogleAcceptQuitGroup = () => setIsQuitGroupPopupOpen(!isQuitGroupPopupOpen);

  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleContentChange = (e) => setContent(e.target.value);

  const clearInputs = () => {
    setTitle('');
    setContent('');
    setTaskColor('var(--clr-main-700)');
  };

  const handleAddTask = (e) => {
    e.preventDefault();
    if (title && content)
      dispatch(
        addNewTask({ groupId, uid, title, content, taskColor, toogleAddTaskPopUp, clearInputs })
      );
  };

  const handleRemoveUser = () => dispatch(removeUserFromGroup({ groupId, uid, admin }));
  const handleSetAsAdmin = () =>
    dispatch(setAdminPermissions({ groupId, uid, currentGroupUsers, permission: true }));
  const handleRemoveAdmin = () =>
    dispatch(setAdminPermissions({ groupId, uid, currentGroupUsers, permission: false }));

  const canRemoveUser =
    (user ? user.uid : undefined) !== uid &&
    (currentGroupUsers ? currentGroupUsers[0].uid : undefined) === (user ? user.uid : undefined);

  const canRemoveAdmin =
    (user ? user.uid : null) === (currentGroupUsers ? currentGroupUsers[0].uid : undefined);

  return (
    <section className="user-tasks-container">
      {(isQuitGroupPopupOpen || isRemoveUserPopupOpen) && (
        <RemoveUserPopup
          isQuitGroupPopupOpen={isQuitGroupPopupOpen}
          toogleAcceptQuitGroup={toogleAcceptQuitGroup}
          toogleAcceptRemoveUser={toogleAcceptRemoveUser}
          error={error}
          displayName={displayName}
          handleRemoveUser={handleRemoveUser}
        />
      )}
      <section className="user-tasks-container__user">
        {canRemoveUser && (
          <OptionsPopup className="user-tasks-container__dots" style={{ top: '0', left: '150%' }}>
            {!admin && (
              <Button buttonType="option" handleOnClick={handleSetAsAdmin}>
                {status === ACTION_STATUS.PENDING ? (
                  <ImSpinner2 className="spinner" />
                ) : (
                  'Set as Admin'
                )}
              </Button>
            )}
            {admin && canRemoveAdmin && (
              <Button buttonType="option" handleOnClick={handleRemoveAdmin}>
                {status === ACTION_STATUS.PENDING ? (
                  <ImSpinner2 className="spinner" />
                ) : (
                  'Remove Admin'
                )}
              </Button>
            )}
            <Button buttonType="option-with-accept" handleOnClick={toogleAcceptRemoveUser}>
              Remove User
            </Button>
          </OptionsPopup>
        )}
        {(user ? user.uid : undefined) === uid && (
          <OptionsPopup className="user-tasks-container__dots" style={{ top: '0', left: '150%' }}>
            <Button buttonType="option-with-accept" handleOnClick={toogleAcceptQuitGroup}>
              Quit Group
            </Button>
          </OptionsPopup>
        )}
        <img
          className="user-tasks-container__img"
          src="/profile-picture.svg"
          alt="profile picture"
        />
        <h2 className="user-tasks-container__username">{displayName}</h2>
      </section>
      <UserTasks tasks={tasks} uid={uid} toogleAddTaskPopUp={toogleAddTaskPopUp} />
      {isPopupOpen && (
        <AddTaskPopup
          toogleAddTaskPopUp={toogleAddTaskPopUp}
          handleAddTask={handleAddTask}
          title={title}
          handleTitleChange={handleTitleChange}
          content={content}
          handleContentChange={handleContentChange}
          taskColor={taskColor}
          setTaskColor={setTaskColor}
        />
      )}
    </section>
  );
};

export default UserTasksContainer;
