import { Route, Routes } from 'react-router';
import GroupNav from '../../components/group-nav/GroupNav';
import Calendar from '../calendar/Calendar';
import Chat from '../chat/Chat';
import Tasks from '../tasks/Tasks';
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
