import { AiOutlineUserAdd } from 'react-icons/Ai';
import Button from '../button/Button';
import Popup from '../popup/Popup';
import InputField from '../input-field/InputField';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import {
  addUserToGroup,
  getGroupsError,
  getUserGroups,
  setGroupsError,
} from '../../features/groups/groupsSlice';
import { getCurrentUser } from '../../features/user/userSlice';
import { useParams } from 'react-router';

const AddUser = () => {
  const dispatch = useDispatch();
  const { groupId } = useParams();
  const user = useSelector(getCurrentUser);
  const error = useSelector(getGroupsError);
  const groups = useSelector(getUserGroups);
  const [isPopUpOpen, setIsPopUpOpen] = useState(false);
  const [searchUserByEmailValue, setSearchUserByEmailValue] = useState('');

  const group = groups.find(({ id }) => id === groupId);

  const toogleAddUserPopup = () => setIsPopUpOpen(!isPopUpOpen);

  const setEmailValue = (e) => setSearchUserByEmailValue(e.target.value);

  const handleAddUser = (e) => {
    e.preventDefault();
    if (searchUserByEmailValue === user.email && group) {
      dispatch(setGroupsError(`You can't add yourself.`));
      return;
    }
    dispatch(
      addUserToGroup({
        email: searchUserByEmailValue,
        user,
        groupId: group.id,
        groupName: group.name,
        closePopup: () => setIsPopUpOpen(false),
      })
    );
  };
  return (
    <>
      <Button
        style={{
          padding: '0 0.75rem',
          display: 'flex',
          gap: '0.25rem',
          alignItems: 'center',
          marginRight: '5rem',
        }}
        handleOnClick={toogleAddUserPopup}
      >
        <AiOutlineUserAdd />
        Add User
      </Button>
      {isPopUpOpen && (
        <Popup
          heading={'Add User'}
          handleClosePopUp={toogleAddUserPopup}
          onSubmit={handleAddUser}
          error={error}
        >
          <InputField
            type="email"
            label="User email"
            labelFor="user-email"
            value={searchUserByEmailValue}
            onChange={setEmailValue}
          />
          <Button type="submit">Add User</Button>
        </Popup>
      )}
    </>
  );
};

export default AddUser;
