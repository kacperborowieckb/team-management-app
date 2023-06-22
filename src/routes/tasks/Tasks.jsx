import { useEffect } from 'react';
import { useDocumentData } from 'react-firebase-hooks/firestore';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import UserTasksContainer from '../../components/user-tasks-container/UserTasksContainer';
import { fetchCurrentGroupUsers, getCurrentGroupUsers } from '../../features/groups/groupsSlice';
import { getDocumentRef } from '../../utils/firebase/firebase';
import './tasks.scss';

const Tasks = () => {
  const dispatch = useDispatch();
  const { groupId } = useParams();
  const groupUsers = useSelector(getCurrentGroupUsers);
  const [tasks = [], loading, error] = useDocumentData(getDocumentRef('tasks', groupId));

  useEffect(() => {
    dispatch(fetchCurrentGroupUsers({ groupId }));
  }, []);

  return (
    <section className="tasks">
      {loading && <section>LOADING</section>}
      {tasks &&
        !loading &&
        groupUsers.map(({ displayName, uid }) => {
          return (
            <UserTasksContainer
              displayName={displayName}
              tasks={tasks[uid] || []}
              uid={uid}
              key={uid}
            />
          );
        })}
      {error && <section>ERROR</section>}
    </section>
  );
};

export default Tasks;
