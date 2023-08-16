import './user-profile-nav.scss';

const UserProfileNav = ({ groups, currentGroup, setCurrentGroup }) => {
  const handleGroupChange = (id) => setCurrentGroup(id);

  return (
    <nav className="user-profile-nav">
      {groups.map(({ id, name }, i) => (
        <div
          className={`user-profile-nav__item ${
            id === currentGroup && 'user-profile-nav__item-active'
          }`}
          key={i}
          onClick={() => handleGroupChange(id)}
        >
          {name}
        </div>
      ))}
    </nav>
  );
};

export default UserProfileNav;
