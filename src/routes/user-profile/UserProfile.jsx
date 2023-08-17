import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Logo from '../../components/logo/Logo';
import UserInfo from '../../components/user-info/UserInfo';
import UserTasksAndEvents from '../../components/user-tasks-and-events/UserTasksAndEvents';
import { getUserUid } from '../../features/user/userSlice';
import { getDocumentRef } from '../../utils/firebase/firebase';
import { useDocument } from 'react-firebase-hooks/firestore';
import './user-profile.scss';
import { getUserGroups, setUserGroups } from '../../features/groups/groupsSlice';
import { ImSpinner2 } from 'react-icons/im';

const UserProfile = () => {
  const dispatch = useDispatch();
  const uid = useSelector(getUserUid);
  const userGroups = useSelector(getUserGroups);
  const [groups, loading] = useDocument(getDocumentRef('users', uid));

  useEffect(() => {
    if (groups) dispatch(setUserGroups(groups.data().groups));
  }, [groups]);

  return (
    <section className="user-profile">
      <Logo />
      <UserInfo />
      {loading && <ImSpinner2 className="spinner" />}
      {userGroups.length > 0 && !loading && <UserTasksAndEvents groups={userGroups} />}
      {userGroups.length === 0 && (
        <h2 className="user-profile__no-groups">You don't belong to any group.</h2>
      )}
    </section>
  );
};

export default UserProfile;
