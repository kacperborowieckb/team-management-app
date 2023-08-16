import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserTasksThunk, getUserTasks, getUserUid } from '../../features/user/userSlice';

const UserProfileTasks = ({ group }) => {
  const dispatch = useDispatch();
  const userTasks = useSelector(getUserTasks);
  const uid = useSelector(getUserUid);

  useEffect(() => {
    dispatch(getUserTasksThunk({ group, uid }));
  }, [group]);

  return <div>UserProfileTasks</div>;
};

export default UserProfileTasks;
