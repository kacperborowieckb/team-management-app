import { useRef } from 'react';
import { useState } from 'react';
import { AiOutlineClose } from 'react-icons/Ai';
import { useDispatch, useSelector } from 'react-redux';
import { createNewGroupDoc } from '../../features/groups/groupsSlice';
import { getCurrentUser } from '../../features/user/userSlice';
import { useClickToClose } from '../../hooks/useClickToClose';
import Button from '../button/Button';
import InputField from '../input-field/InputField';
import './create-group-popup.scss';

const CreateGroupPopup = ({ handleTooglePopup }) => {
  const dispatch = useDispatch();
  const user = useSelector(getCurrentUser);
  const [groupName, setGroupName] = useState('');
  const popup = useRef();
  useClickToClose(popup, handleTooglePopup);

  const handleNameChange = (e) => setGroupName(e.target.value);

  const handleCreateNewGroup = async (e) => {
    e.preventDefault();
    dispatch(createNewGroupDoc({ groupName, user, handleTooglePopup }));
  };

  return (
    <section className="create-group-popup" ref={popup}>
      <section className="create-group-popup__container">
        <h2 className="create-group-popup__heading">Create New Group</h2>
        <form className="create-group-popup__form" onSubmit={handleCreateNewGroup}>
          <InputField
            label="Group Name"
            labelFor="group-name"
            value={groupName}
            onChange={handleNameChange}
          />
          <Button type="submit">Create New Group</Button>
        </form>
        <AiOutlineClose className="create-group-popup__close" onClick={handleTooglePopup} />
      </section>
    </section>
  );
};

export default CreateGroupPopup;
