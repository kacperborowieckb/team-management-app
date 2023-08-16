import { useState } from 'react';
import UserProfileEvents from '../user-profile-events/UserProfileEvents';
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
      </section>
      <section className="user-tasks-and-events__content">
        <UserProfileTasks group={currentGroup} />
        <UserProfileEvents />
      </section>
    </section>
  );
};

export default UserTasksAndEvents;
