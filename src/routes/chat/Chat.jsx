import './chat.scss';
import ChatContainer from '../../components/chat-container/ChatContainer';
import NewMessage from '../../components/new-message/NewMessage';

const Chat = () => {
  return (
    <section className="chat">
      <ChatContainer />
      <NewMessage />
    </section>
  );
};

export default Chat;
