import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTasks, getUserTasksThunk } from '../../features/tasks/tasksSlice';
import { getUserUid } from '../../features/user/userSlice';
import TaskItem from '../task-item/TaskItem';
import './user-profile-tasks.scss';

const UserProfileTasks = ({ group, searchValue }) => {
  const dispatch = useDispatch();
  const uid = useSelector(getUserUid);
  const userTasks = useSelector(getTasks);

  const filterItems = (tasks) => {
    return tasks.filter(
      (task) =>
        task.title.toLowerCase().includes(searchValue.toLowerCase()) ||
        task.content.toLowerCase().includes(searchValue.toLowerCase())
    );
  };

  useEffect(() => {
    dispatch(getUserTasksThunk({ group, uid }));
  }, [group]);

  return (
    <section className="user-profile-tasks">
      <h2 className="user-profile-tasks__heading">Tasks</h2>
      {userTasks[uid] && userTasks[uid].length > 0 ? (
        filterItems(userTasks[uid]).map(
          ({ title, content, color, taskId, createdAt, createdBy }) => (
            <TaskItem
              title={title}
              content={content}
              color={color}
              key={taskId}
              taskId={taskId}
              uid={uid}
              createdAt={createdAt}
              createdBy={createdBy}
              group={group}
            />
          )
        )
      ) : (
        <h3 className="user-profile-tasks__no-tasks">Empty here.</h3>
      )}
    </section>
  );
};

export default UserProfileTasks;
