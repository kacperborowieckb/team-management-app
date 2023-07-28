import './new-message.scss';
import InputField from '../input-field/InputField';
import Button from '../button/Button';
import { useEffect, useState } from 'react';
import { AiOutlineSend } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { addNewMessage, setMessages } from '../../features/chat/chatSlice';
import { getCurrentUser } from '../../features/user/userSlice';
import { useParams } from 'react-router';

const NewMessage = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(getCurrentUser);
  const { groupId } = useParams();
  const [messageValue, setMessageValue] = useState('');
  const [canSendAnotherMessage, setCanSendAnotherMessage] = useState(true);

  const handleChange = (e) => setMessageValue(e.target.value);
  const clearInput = () => setMessageValue('');
  const setTimer = () => {
    setCanSendAnotherMessage(false);
    setTimeout(() => {
      setCanSendAnotherMessage(true);
    }, 1000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (canSendAnotherMessage) {
      dispatch(
        addNewMessage({
          displayName: currentUser.displayName,
          uid: currentUser.uid,
          content: messageValue,
          groupId,
          clearInput,
          setTimer,
        })
      );
    }
  };

  useEffect(() => {
    dispatch(setMessages([]));
  }, [groupId]);

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
