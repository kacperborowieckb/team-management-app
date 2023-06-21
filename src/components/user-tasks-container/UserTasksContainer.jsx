import TaskItem from '../task-item/TaskItem';
import './user-tasks-container.scss';

const UserTasksContainer = () => {
  return (
    <section className="user-tasks-container">
      <section className="user-tasks-container__user">
        <img
          className="user-tasks-container__img"
          src="/profile-picture.png"
          alt="profile picture"
        />
        <h2 className="user-tasks-container__username">Kacper Borowczyk dsadsadas</h2>
      </section>
      <section className="user-tasks-container__tasks-section">
        <TaskItem />
        <TaskItem />
        <TaskItem />
        <TaskItem />
        <TaskItem />
        <TaskItem />
      </section>
    </section>
  );
};

export default UserTasksContainer;
