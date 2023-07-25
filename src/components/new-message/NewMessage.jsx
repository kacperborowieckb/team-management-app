import './new-message.scss';
import InputField from '../input-field/InputField';
import Button from '../button/Button';
import { useState } from 'react';
import { AiOutlineSend } from 'react-icons/Ai';

const NewMessage = () => {
  const [messageValue, setMessageValue] = useState('');

  const handleChange = (e) => setMessageValue(e.target.value);
  const clearInput = () => setMessageValue('');

  const handleSubmit = (e) => {
    e.preventDefault();
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
