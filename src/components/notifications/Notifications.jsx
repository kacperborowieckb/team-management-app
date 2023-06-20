import './notifications.scss';
import { MdNotifications } from 'react-icons/Md';
import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentUser } from '../../features/user/userSlice';
import {
  fetchNotifications,
  getNotifications,
} from '../../features/notifications/notificationsSlice';
import Button from '../button/Button';

const Notifications = () => {
  const dispatch = useDispatch();
  const { uid } = useSelector(getCurrentUser);
  const notifications = useSelector(getNotifications);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const tooglePopUp = () => setIsPopupOpen(!isPopupOpen);

  useEffect(() => {
    dispatch(fetchNotifications({ uid }));
  }, []);

  return (
    <section className="notifications">
      <MdNotifications onClick={tooglePopUp} />
      {isPopupOpen && (
        <section className="notifications__popup">
          {notifications.length > 0 ? (
            notifications.map(({ from: { name }, groupName }, i) => (
              <section className="notifications__item" key={i}>
                <h3 className="notifications__heading">
                  <span className="notifications__name">{name} </span>Invated you!
                </h3>
                <h4 className="notifications__group-name">{groupName}</h4>
                <section className="notifications__buttons">
                  <Button buttonType="decline">Decline</Button>
                  <Button buttonType="accept">Join</Button>
                </section>
              </section>
            ))
          ) : (
            <p>Nothing here...</p>
          )}
        </section>
      )}
    </section>
  );
};

export default Notifications;
