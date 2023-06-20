import './notifications.scss';
import { MdNotifications } from 'react-icons/Md';
import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentUser } from '../../features/user/userSlice';
import {
  fetchNotifications,
  getCurrentNotificationsStatus,
  getNotifications,
  setNotificationsToOld,
} from '../../features/notifications/notificationsSlice';
import Button from '../button/Button';
import { ACTION_STATUS } from '../../utils/reducer/reducer.utils';

const Notifications = () => {
  const dispatch = useDispatch();
  const { uid } = useSelector(getCurrentUser);
  const notifications = useSelector(getNotifications);
  const status = useSelector(getCurrentNotificationsStatus);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [newNotifications, setNewNotifications] = useState(0);

  const tooglePopUp = () => setIsPopupOpen(!isPopupOpen);

  useEffect(() => {
    dispatch(fetchNotifications({ uid }));
  }, []);

  useEffect(() => {
    if (newNotifications !== 0 && isPopupOpen) {
      dispatch(setNotificationsToOld({ uid, notifications }));
    }
  }, [isPopupOpen]);

  useEffect(() => {
    if (status !== ACTION_STATUS.PENDING) {
      let amount = 0;
      notifications.map((notification) => {
        if (notification.new) amount++;
      });
      setNewNotifications(amount);
    }
  }, [notifications]);

  return (
    <section className="notifications">
      <section className="notifications__container" onClick={tooglePopUp}>
        <MdNotifications />
        {newNotifications !== 0 && (
          <section className="notifications__new">{newNotifications}</section>
        )}
      </section>
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
