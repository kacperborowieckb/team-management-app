import './new-message.scss';
import InputField from '../input-field/InputField';
import Button from '../button/Button';
import { useState } from 'react';
import { AiOutlineSend } from 'react-icons/Ai';
import { useDispatch, useSelector } from 'react-redux';
import { addNewMessage } from '../../features/chat/chatSlice';
import { getCurrentUser } from '../../features/user/userSlice';
import { useParams } from 'react-router';

const NewMessage = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(getCurrentUser);
  const { groupId } = useParams();
  const [messageValue, setMessageValue] = useState('');

  const handleChange = (e) => setMessageValue(e.target.value);
  const clearInput = () => setMessageValue('');

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      addNewMessage({
        displayName: currentUser.displayName,
        uid: currentUser.uid,
        content: messageValue,
        groupId,
        clearInput,
      })
    );
  };

  return (
    <form className="new-message" onSubmit={handleSubmit}>
      <InputField
        label={''}
        labelFor={'new-message'}
        placeholder={'Aa'}
        value={messageValue}
        onChange={handleChange}
        autoComplete={'off'}
      />
      <Button>
        <AiOutlineSend />
      </Button>
    </form>
  );
};

export default NewMessage;
