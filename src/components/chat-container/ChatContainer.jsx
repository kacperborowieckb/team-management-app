import './chat-container.scss';
import Message from '../message/Message';

const ChatContainer = () => {
  return (
    <div className="chat-container">
      <Message displayName={'kacper'} content={'Very long ngbouasgj gdgs'} />
      <Message
        displayName={'Ktos inny'}
        content={
          'Very long Lorem ipsum hello hello what are you doing here whats up and here we go lets get to three lines '
        }
      />
      <Message isYours={true} displayName={'Test User'} content={'Very long message'} />
    </div>
  );
};

export default ChatContainer;
