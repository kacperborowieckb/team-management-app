import { useEffect } from 'react';
import { useDocumentData } from 'react-firebase-hooks/firestore';
import { ImSpinner2 } from 'react-icons/im';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import UserTasksContainer from '../../components/user-tasks-container/UserTasksContainer';
import { getCurrentGroupUsers } from '../../features/groups/groupsSlice';
import { setTasks } from '../../features/tasks/tasksSlice';
import { getDocumentRef } from '../../utils/firebase/firebase';
import './tasks.scss';

const Tasks = () => {
  const dispatch = useDispatch();
  const { groupId } = useParams();
  const groupUsers = useSelector(getCurrentGroupUsers);
  const [tasks = {}, loading, error] = useDocumentData(getDocumentRef('tasks', groupId));

  useEffect(() => {
    dispatch(setTasks(tasks));
  }, [tasks]);

  return (
    <section className="tasks">
      {loading && (
        <section className="tasks__loading">
          <ImSpinner2 className="spinner" />
        </section>
      )}
      {tasks &&
        !loading &&
        groupUsers.map(({ displayName, uid, admin, url }) => {
          return (
            <UserTasksContainer
              displayName={displayName}
              tasks={tasks[uid] || []}
              uid={uid}
              admin={admin}
              key={uid}
              url={url}
            />
          );
        })}
      {error && <section>ERROR</section>}
    </section>
  );
};

export default Tasks;
