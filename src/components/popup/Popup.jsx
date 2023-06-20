import { AiOutlineClose } from 'react-icons/Ai';
import './popup.scss';

const Popup = ({ heading, handleClosePopUp, error, onSubmit, children }) => {
  return (
    <section className="popup">
      <section className="popup__container">
        <h2 className="popup__heading">{heading}</h2>
        {error && <p>{error}</p>}
        <form className="popup__form" onSubmit={onSubmit}>
          {children}
        </form>
        <AiOutlineClose className="popup__close" onClick={handleClosePopUp} />
      </section>
    </section>
  );
};

export default Popup;
