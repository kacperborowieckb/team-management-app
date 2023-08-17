import { useState } from 'react';
import UserProfileEvents from '../user-profile-events/UserProfileEvents';
import UserProfileNav from '../user-profile-nav/UserProfileNav';
import UserProfileTasks from '../user-profile-tasks/UserProfileTasks';
import InputField from '../input-field/InputField';
import './user-tasks-and-events.scss';

const UserTasksAndEvents = ({ groups }) => {
  const [currentGroup, setCurrentGroup] = useState(groups[0].id);
  const [searchValue, setSearchValue] = useState('');

  const handleInputChange = (e) => {
    setSearchValue(e.target.value);
  };

  return (
    <section className="user-tasks-and-events">
      <section className="user-tasks-and-events__nav-container">
        <UserProfileNav
          groups={groups}
          currentGroup={currentGroup}
          setCurrentGroup={setCurrentGroup}
        />
      </section>
      <InputField
        label={'Search'}
        labelFor={'search'}
        value={searchValue}
        onChange={handleInputChange}
      />
      <section className="user-tasks-and-events__content">
        <UserProfileTasks group={currentGroup} searchValue={searchValue} />
        <UserProfileEvents group={currentGroup} searchValue={searchValue} />
      </section>
    </section>
  );
};

export default UserTasksAndEvents;
