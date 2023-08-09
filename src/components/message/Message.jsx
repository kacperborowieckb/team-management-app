import { useEffect } from 'react';
import { useState } from 'react';
import { getUserProfileUrl } from '../../utils/firebase/firebase';
import './message.scss';

const Message = ({ uid, isYours = false, displayName, content }) => {
  const [url, setUrl] = useState('');

  useEffect(() => {
    const getUrl = async () => {
      const url = await getUserProfileUrl(uid);
      setUrl(url);
    };

    getUrl();
  }, []);

  return (
    <section
      className="message"
      style={{ justifyContent: isYours && 'flex-end', marginLeft: isYours && 'auto' }}
    >
      {!isYours && (
        <section className="message__profile">
          <img
            src={`${url.length > 0 ? url : '/profile-picture.svg'}`}
            alt="profile picture"
            className="message__profile-picture"
          />
          <p className="message__display-name">{displayName}</p>
        </section>
      )}
      <section className="message__content-container">
        <p className="message__content">{content}</p>
      </section>
    </section>
  );
};

export default Message;
