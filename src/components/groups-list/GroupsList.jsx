import './groups-list.scss';
import { IoMdArrowDropdown } from 'react-icons/io';
import { useState } from 'react';
import { useDocument } from 'react-firebase-hooks/firestore';
import { useDispatch, useSelector } from 'react-redux';
import { getUserUid } from '../../features/user/userSlice';
import { getDocumentRef } from '../../utils/firebase/firebase';
import { useEffect } from 'react';
import { setUserGroups } from '../../features/groups/groupsSlice';
import { Link, useParams } from 'react-router-dom';
import { BsPlus } from 'react-icons/bs';
import CreateGroupPopup from '../create-group-popup/CreateGroupPopup';

const GroupsList = ({ content }) => {
  const dispatch = useDispatch();
  const userUid = useSelector(getUserUid);
  const { groupId } = useParams();
  const [isListOpen, setIsListOpen] = useState(groupId ? true : false);
  const [groups, loading, error] = useDocument(getDocumentRef('users', userUid));
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleOpenList = () => setIsListOpen(!isListOpen);

  const handleTooglePopup = () => setIsPopupOpen(!isPopupOpen);

  useEffect(() => {
    if (groups) dispatch(setUserGroups(groups.data().groups));
  }, [groups]);

  return (
    <>
      <li className="groups-list">
        <div
          className={`groups-list__title ${isListOpen && 'groups-list__title-active'}`}
          onClick={handleOpenList}
        >
          {content.charAt(0).toUpperCase() + content.slice(1)}
          <IoMdArrowDropdown
            className="groups-list__dropdown-icon"
            style={{ rotate: !isListOpen && '-90deg' }}
          />
        </div>
        {isListOpen && (
          <ul className="groups-list__sub-list">
            {error && <p>error</p>}
            {loading && <p>loading</p>}
            {groups &&
              groups.data().groups.map((group, i) => (
                <li
                  className={`groups-list__sub-list-item ${
                    group.id === groupId && 'groups-list__sub-list-item-active'
                  }`}
                  key={i}
                >
                  <Link to={`/groups/${group.id}`}>
                    {group.name && group.name.length > 10
                      ? group.name.slice(0, 15) + '...'
                      : group.name}
                  </Link>
                </li>
              ))}
            <li className="groups-list__create-new" onClick={handleTooglePopup}>
              <BsPlus />
              Create new group
            </li>
          </ul>
        )}
      </li>
      {isPopupOpen && <CreateGroupPopup handleTooglePopup={handleTooglePopup} />}
    </>
  );
};

export default GroupsList;
