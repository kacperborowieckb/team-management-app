import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Route, Routes, useNavigate, useParams } from 'react-router';
import GroupNav from '../../components/group-nav/GroupNav';
import { fetchCurrentGroupUsers } from '../../features/groups/groupsSlice';
import { getCurrentUser } from '../../features/user/userSlice';
import { getGroupUsers } from '../../utils/firebase/firebase';
import Calendar from '../calendar/Calendar';
import Chat from '../chat/Chat';
import Tasks from '../tasks/Tasks';
import './group-page.scss';

const GroupPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { uid } = useSelector(getCurrentUser);
  const { groupId } = useParams();

  useEffect(() => {
    dispatch(fetchCurrentGroupUsers({ groupId }))
      .unwrap()
      .then((users) => {
        const user = users.find((user) => user.uid === uid);
        if (!user) navigate('/');
      });
  }, [groupId]);

  return (
    <Routes>
      <Route path="/" element={<GroupNav />}>
        <Route path="tasks" element={<Tasks />} />
        <Route path="calendar" element={<Calendar />} />
        <Route path="chat" element={<Chat />} />
      </Route>
    </Routes>
  );
};

export default GroupPage;
