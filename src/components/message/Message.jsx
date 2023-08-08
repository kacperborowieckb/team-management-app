import './message.scss';

const Message = ({ isYours = false, displayName, content }) => {
  return (
    <section
      className="message"
      style={{ justifyContent: isYours && 'flex-end', marginLeft: isYours && 'auto' }}
    >
      {!isYours && (
        <section className="message__profile">
          <img
            src="/profile-picture.svg"
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
