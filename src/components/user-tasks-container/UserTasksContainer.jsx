import TaskItem from '../task-item/TaskItem';
import Button from '../button/Button';
import './user-tasks-container.scss';
import { useState } from 'react';
import Popup from '../popup/Popup';
import InputField from '../input-field/InputField';
import ColorSelector from '../color-selector/ColorSelector';
import { useDispatch } from 'react-redux';
import { addNewTask } from '../../features/tasks/tasksSlice';
import { useParams } from 'react-router';
import AddTaskPopup from '../add-task-popup/AddTaskPopup';

const UserTasksContainer = ({ displayName, tasks, uid }) => {
  const dispatch = useDispatch();
  const { groupId } = useParams();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [taskColor, setTaskColor] = useState('var(--clr-main-700)');

  const toogleAddTaskPopUp = () => setIsPopupOpen(!isPopupOpen);

  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleContentChange = (e) => setContent(e.target.value);

  const handleAddTask = (e) => {
    e.preventDefault();
    if (title && content)
      dispatch(addNewTask({ groupId, uid, title, content, taskColor, toogleAddTaskPopUp }));
  };

  return (
    <section className="user-tasks-container">
      <section className="user-tasks-container__user">
        <img
          className="user-tasks-container__img"
          src="/profile-picture.png"
          alt="profile picture"
        />
        <h2 className="user-tasks-container__username">{displayName}</h2>
      </section>
      <section className="user-tasks-container__tasks-section">
        {tasks.length > 0 ? (
          tasks.map(({ title, content, color, taskId, createdAt, createdBy }) => (
            <TaskItem
              title={title}
              content={content}
              color={color}
              key={taskId}
              taskId={taskId}
              uid={uid}
              createdAt={createdAt}
              createdBy={createdBy}
            />
          ))
        ) : (
          <h3 className="user-tasks-container__no-tasks">Empty here..</h3>
        )}
      </section>
      <Button buttonType="add-task" handleOnClick={toogleAddTaskPopUp}>
        Add Task
      </Button>
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
