import TaskItem from '../task-item/TaskItem';
import Button from '../button/Button';
import './user-tasks-container.scss';
import { useState } from 'react';
import Popup from '../popup/Popup';

const UserTasksContainer = ({ displayName, tasks, uid }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const toogleAddTaskPopUp = () => setIsPopupOpen(!isPopupOpen);

  const handleAddTask = () => {
    console.log('dziala');
    return;
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
          tasks.map(({ title, content, taskId }) => (
            <TaskItem title={title} content={content} key={taskId} />
          ))
        ) : (
          <h3 className="user-tasks-container__no-tasks">Empty here..</h3>
        )}
      </section>
      <Button buttonType="add-task" handleOnClick={toogleAddTaskPopUp}>
        Add Task
      </Button>
      {isPopupOpen && (
        <Popup
          heading="Add Task"
          handleClosePopUp={toogleAddTaskPopUp}
          error=""
          onSubmit={handleAddTask}
        ></Popup>
      )}
    </section>
  );
};

export default UserTasksContainer;
