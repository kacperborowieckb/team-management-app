import './chat-container.scss';
import Message from '../message/Message';
import { useParams } from 'react-router';
import { useDocumentData } from 'react-firebase-hooks/firestore';
import { getDocumentRef } from '../../utils/firebase/firebase';
import { getCurrentUser } from '../../features/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { ImSpinner2 } from 'react-icons/im';
import { useEffect } from 'react';
import { setMessages } from '../../features/chat/chatSlice';

const ChatContainer = () => {
  const dispatch = useDispatch();
  const { groupId } = useParams();
  const currentUser = useSelector(getCurrentUser);
  const [data = {}, loading, error] = useDocumentData(getDocumentRef('chat', groupId));

  useEffect(() => {
    if (!loading) {
      dispatch(setMessages(data.messages));
    }
  }, [data]);

  return (
    <div className="chat-container" style={{ placeContent: (loading || error) && 'center' }}>
      {loading ? (
        <ImSpinner2 className="spinner" style={{ margin: ' 0 auto' }} />
      ) : (
        data.messages.map(({ uid, displayName, content }, i) => (
          <Message
            isYours={uid === currentUser.uid}
            displayName={displayName}
            content={content}
            key={i}
          />
        ))
      )}
      {error && <p className="chat-container__error">Error. Please refresh the page.</p>}
    </div>
  );
};

export default ChatContainer;
