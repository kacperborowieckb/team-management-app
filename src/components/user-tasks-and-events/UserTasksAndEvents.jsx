import { useState } from 'react';
import UserProfileNav from '../user-profile-nav/UserProfileNav';
import UserProfileTasks from '../user-profile-tasks/UserProfileTasks';
import './user-tasks-and-events.scss';

const UserTasksAndEvents = ({ groups }) => {
  const [currentGroup, setCurrentGroup] = useState(groups[0].id);

  return (
    <section className="user-tasks-and-events">
      <section className="user-tasks-and-events__nav-container">
        <UserProfileNav
          groups={groups}
          currentGroup={currentGroup}
          setCurrentGroup={setCurrentGroup}
        />
        <UserProfileTasks group={currentGroup} />
      </section>
    </section>
  );
};

export default UserTasksAndEvents;
