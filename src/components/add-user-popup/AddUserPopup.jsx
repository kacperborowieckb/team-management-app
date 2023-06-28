import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import {
  addUserToGroup,
  getGroupsError,
  getUserGroups,
  setGroupsError,
} from '../../features/groups/groupsSlice';
import { getCurrentUser } from '../../features/user/userSlice';
import Popup from '../popup/Popup';
import InputField from '../input-field/InputField';
import Button from '../button/Button';

const AddUserPopup = ({ setIsPopUpOpen, toogleAddUserPopup }) => {
  const dispatch = useDispatch();
  const { groupId } = useParams();
  const user = useSelector(getCurrentUser);
  const error = useSelector(getGroupsError);
  const groups = useSelector(getUserGroups);
  const [searchUserByEmailValue, setSearchUserByEmailValue] = useState('');

  const group = groups.find(({ id }) => id === groupId);
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
  );
};

export default AddUserPopup;
