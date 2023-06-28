import { AiOutlineUserAdd } from 'react-icons/Ai';
import Button from '../button/Button';

const AddUser = ({ toogleAddUserPopup }) => {
  return (
    <>
      <Button
        style={{
          display: 'flex',
          gap: '0.25rem',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        handleOnClick={toogleAddUserPopup}
        buttonType="option"
      >
        <AiOutlineUserAdd />
        Add User
      </Button>
    </>
  );
};

export default AddUser;
