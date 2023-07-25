import './chat-container.scss';
import Message from '../message/Message';
import { useParams } from 'react-router';
import { useDocumentData } from 'react-firebase-hooks/firestore';
import { getDocumentRef } from '../../utils/firebase/firebase';
import { getCurrentUser } from '../../features/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { ImSpinner2 } from 'react-icons/im';
import { useEffect, useRef } from 'react';
import { setMessages } from '../../features/chat/chatSlice';

const ChatContainer = () => {
  const dispatch = useDispatch();
  const { groupId } = useParams();
  const currentUser = useSelector(getCurrentUser);
  const messageBox = useRef(null);
  const [data = {}, loading, error] = useDocumentData(getDocumentRef('chat', groupId));

  useEffect(() => {
    if (!loading && data) {
      dispatch(setMessages(data.messages));
    }
  }, [data]);

  useEffect(() => {
    if (!loading && data && messageBox.current) {
      messageBox.current.scrollIntoView({ block: 'end' });
    }
  }, [data]);

  return (
    <div className="chat-container">
      {loading && <ImSpinner2 className="spinner" />}
      {data.messages && !loading && (
        <section className="chat-container__message-box" ref={messageBox}>
          {data.messages.map(({ uid, displayName, content }, i) => (
            <Message
              isYours={uid === currentUser.uid}
              displayName={displayName}
              content={content}
              key={i}
            />
          ))}
        </section>
      )}
      {error && <p className="chat-container__error">Error. Please refresh the page.</p>}
    </div>
  );
};

export default ChatContainer;
