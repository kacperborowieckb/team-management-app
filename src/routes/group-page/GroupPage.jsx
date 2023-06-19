import { Route, Routes } from 'react-router';
import Calendar from '../../components/calendar/Calendar';
import Chat from '../../components/chat/Chat';
import GroupNav from '../../components/group-nav/GroupNav';
import Tasks from '../../components/tasks/Tasks';
import './group-page.scss';

const GroupPage = () => {
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
