import TaskItem from '../task-item/TaskItem';
import Button from '../button/Button';
import './user-tasks-container.scss';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addNewTask } from '../../features/tasks/tasksSlice';
import { useParams } from 'react-router';
import AddTaskPopup from '../add-task-popup/AddTaskPopup';
import { removeUserFromGroup } from '../../features/groups/groupsSlice';
import { getCurrentUser } from '../../features/user/userSlice';
import OptionsPopup from '../options-popup/OptionsPopup';
import UserTasks from '../user-tasks/UserTasks';

const UserTasksContainer = ({ displayName, tasks, uid, admin }) => {
  const dispatch = useDispatch();
  const { groupId } = useParams();
  const user = useSelector(getCurrentUser);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [taskColor, setTaskColor] = useState('var(--clr-main-700)');

  const toogleAddTaskPopUp = () => setIsPopupOpen(!isPopupOpen);

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

  const canRemoveUser = !admin && (user ? user.uid : undefined) !== uid;

  const handleRemoveUser = () => dispatch(removeUserFromGroup({ groupId, uid }));
  // IMPORTANT !!!
  // if want to quit group when admin => new admin or delete whole group
  return (
    <section className="user-tasks-container">
      <section className="user-tasks-container__user">
        {canRemoveUser && (
          <>
            <OptionsPopup className="user-tasks-container__dots" style={{ top: '0', left: '150%' }}>
              <Button buttonType="option" handleOnClick={handleRemoveUser}>
                Set as Admin
              </Button>
              <Button buttonType="option-with-accept" handleOnClick={handleRemoveUser}>
                Remove User
              </Button>
            </OptionsPopup>
          </>
        )}
        {(user ? user.uid : undefined) === uid && (
          <>
            <OptionsPopup className="user-tasks-container__dots" style={{ top: '0', left: '150%' }}>
              <Button buttonType="option-with-accept" handleOnClick={handleRemoveUser}>
                Quit Group
              </Button>
            </OptionsPopup>
          </>
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
