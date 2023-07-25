import { useRef } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { useClickToClose } from '../../hooks/useClickToClose';
import './popup.scss';

const Popup = ({ heading, handleClosePopUp, error, onSubmit, children }) => {
  const popup = useRef();
  useClickToClose(popup, handleClosePopUp);

  return (
    <section className="popup" ref={popup}>
      <section className="popup__container">
        <h2 className="popup__heading">{heading}</h2>
        {error && <p className="popup__error">{error}</p>}
        {onSubmit ? (
          <form className="popup__form" onSubmit={onSubmit}>
            {children}
          </form>
        ) : (
          <section>{children}</section>
        )}
        <AiOutlineClose className="popup__close" onClick={handleClosePopUp} />
      </section>
    </section>
  );
};

export default Popup;
