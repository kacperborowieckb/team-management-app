import Button from '../button/Button';
import './user-tasks-container.scss';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addNewTask } from '../../features/tasks/tasksSlice';
import { useParams } from 'react-router';
import AddTaskPopup from '../add-task-popup/AddTaskPopup';
import { getGroupsError, removeUserFromGroup } from '../../features/groups/groupsSlice';
import { getCurrentUser } from '../../features/user/userSlice';
import OptionsPopup from '../options-popup/OptionsPopup';
import UserTasks from '../user-tasks/UserTasks';
import Popup from '../popup/Popup';

const UserTasksContainer = ({ displayName, tasks, uid, admin }) => {
  const dispatch = useDispatch();
  const { groupId } = useParams();
  const user = useSelector(getCurrentUser);
  const error = useSelector(getGroupsError);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [taskColor, setTaskColor] = useState('var(--clr-main-700)');
  const [isRemoveUserPopupOpen, setIsRemoveUserPopupOpen] = useState(false);
  const [isQuitGroupPopupOpen, setIsQuitGroupPopupOpen] = useState();

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

  const canRemoveUser = !admin && (user ? user.uid : undefined) !== uid;

  return (
    <section className="user-tasks-container">
      {(isQuitGroupPopupOpen || isRemoveUserPopupOpen) && (
        <Popup
          heading={isQuitGroupPopupOpen ? 'Quit group' : 'Remove user'}
          handleClosePopUp={isQuitGroupPopupOpen ? toogleAcceptQuitGroup : toogleAcceptRemoveUser}
          error={error}
        >
          <p className="user-tasks-container__accept-popup-paragraph">
            {isQuitGroupPopupOpen
              ? 'Are you sure you want to quit?'
              : `Are you sure you want remove ${displayName} from group?`}
          </p>
          <section className="user-tasks-container__accept-popup-buttons">
            <Button
              buttonType="decline"
              handleOnClick={isQuitGroupPopupOpen ? toogleAcceptQuitGroup : toogleAcceptRemoveUser}
            >
              No
            </Button>
            <Button buttonType="accept" handleOnClick={handleRemoveUser}>
              Yes
            </Button>
          </section>
        </Popup>
      )}
      <section className="user-tasks-container__user">
        {canRemoveUser && (
          <OptionsPopup className="user-tasks-container__dots" style={{ top: '0', left: '150%' }}>
            <Button buttonType="option">Set as Admin</Button>
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
          src="/profile-picture.png"
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
