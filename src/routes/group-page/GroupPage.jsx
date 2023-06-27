import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Routes, useParams } from 'react-router';
import GroupNav from '../../components/group-nav/GroupNav';
import { fetchCurrentGroupUsers } from '../../features/groups/groupsSlice';
import Calendar from '../calendar/Calendar';
import Chat from '../chat/Chat';
import Tasks from '../tasks/Tasks';
import './group-page.scss';

const GroupPage = () => {
  const dispatch = useDispatch();
  const { groupId } = useParams();

  useEffect(() => {
    dispatch(fetchCurrentGroupUsers({ groupId }));
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
