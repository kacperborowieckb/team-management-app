import { collection } from 'firebase/firestore';
import { useEffect } from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import UserTasksContainer from '../../components/user-tasks-container/UserTasksContainer';
import { getCurrentUser } from '../../features/user/userSlice';
import { db } from '../../utils/firebase/firebase';

import './tasks.scss';

const Tasks = () => {
  const dispatch = useDispatch();
  const user = useSelector(getCurrentUser);
  const { groupId } = useParams();
  // const [tasks, loading, error] = useCollectionData(collection(db, 'tasks'));

  return (
    <section className="tasks">
      {/* {loading && <section>LOADING</section>}
      {tasks && <section className="tasks__container">container</section>}
  {error && <section>ERROR</section>} */}
      <UserTasksContainer />
      <UserTasksContainer />
      <UserTasksContainer />
      <UserTasksContainer />
      <UserTasksContainer />
      <UserTasksContainer />
    </section>
  );
};

export default Tasks;
