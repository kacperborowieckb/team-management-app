import { Link, useLocation, useParams } from 'react-router-dom';
import { AiOutlineUserAdd } from 'react-icons/Ai';
import Button from '../button/Button';
import './group-nav.scss';
import { useState } from 'react';
import Popup from '../popup/Popup';
import InputField from '../input-field/InputField';
import { useDispatch } from 'react-redux';

const GroupNav = () => {
  const { groupId } = useParams();
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const activePage = pathname.split('/').at(-1) || null;
  const [isPopUpOpen, setIsPopUpOpen] = useState(false);
  const [searchUserByEmailValue, setSearchUserByEmailValue] = useState('');

  const toogleAddUserPopup = () => setIsPopUpOpen(!isPopUpOpen);

  const setEmailValue = (e) => setSearchUserByEmailValue(e.target.value);

  const handleAddUser = (e) => {
    e.preventDefault();
  };

  return (
    <section className="group-nav">
      <section className="group-nav__container">
        <Link
          to={`/groups/${groupId}/tasks`}
          className={`group-nav__link ${activePage === 'tasks' && 'group-nav__link-active'}`}
        >
          Tasks
        </Link>
        <Link
          to={`/groups/${groupId}/calendar`}
          className={`group-nav__link ${activePage === 'calendar' && 'group-nav__link-active'}`}
        >
          Calendar
        </Link>
        <Link
          to={`/groups/${groupId}/chat`}
          className={`group-nav__link ${activePage === 'chat' && 'group-nav__link-active'}`}
        >
          Chat
        </Link>
      </section>
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
        <Popup heading={'Add User'} handleClosePopUp={toogleAddUserPopup} onSubmit={handleAddUser}>
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
    </section>
  );
};

export default GroupNav;
