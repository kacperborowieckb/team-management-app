import './options-popup.scss';
import { BsThreeDots } from 'react-icons/bs';
import { useState } from 'react';
import { useRef } from 'react';
import { useEffect } from 'react';

const OptionsPopup = ({ className, children, ...otherProps }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const popup = useRef();

  const tooglePopup = () => setIsPopupOpen(!isPopupOpen);
  const closePopup = () => setIsPopupOpen(false);

  useEffect(() => {
    const handleClick = (e) => {
      if (!popup.current.contains(e.target)) {
        closePopup();
      }
    };
    window.addEventListener('click', handleClick);

    return () => window.removeEventListener('click', handleClick);
  }, []);

  return (
    <section className={className} ref={popup}>
      <BsThreeDots onClick={tooglePopup} className="options-popup__dots" />
      {isPopupOpen && (
        <section className="options-popup__container" {...otherProps}>
          {children}
        </section>
      )}
    </section>
  );
};
export default OptionsPopup;
