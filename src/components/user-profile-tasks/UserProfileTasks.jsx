import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserTasksThunk, getUserTasks, getUserUid } from '../../features/user/userSlice';
import TaskItem from '../task-item/TaskItem';
import './user-profile-tasks.scss';

const UserProfileTasks = ({ group }) => {
  const dispatch = useDispatch();
  const userTasks = useSelector(getUserTasks);
  const uid = useSelector(getUserUid);

  useEffect(() => {
    dispatch(getUserTasksThunk({ group, uid }));
  }, [group]);

  return (
    <section className="user-profile-tasks">
      <h2 className="user-profile-tasks__heading">Tasks</h2>
      {userTasks.length > 0 ? (
        userTasks.map(({ title, content, color, taskId, createdAt, createdBy }) => (
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
        <h3 className="user-profile-tasks__no-tasks">Empty here.</h3>
      )}
    </section>
  );
};

export default UserProfileTasks;
