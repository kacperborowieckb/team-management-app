import './calendar-item.scss';
import { AiOutlinePlus } from 'react-icons/Ai';
import { useState } from 'react';

const CalendarItem = ({ currentMonth, day, isSunday }) => {
  const [isPopupOpen, setIsPopUpOpen] = useState(false);

  const openPopup = () => setIsPopUpOpen(true);
  const closePopup = () => setIsPopUpOpen(false);

  return (
    <>
      {currentMonth ? (
        <section className="calendar-item">
          <p style={{ color: isSunday && 'var(--clr-red)' }}>{day}</p>
          <AiOutlinePlus className="calendar-item__add-event" onClick={openPopup} />
        </section>
      ) : (
        <section className="calendar-item" style={{ opacity: !currentMonth && 0.8 }}>
          <p style={{ color: isSunday && 'var(--clr-red)' }}>{day}</p>
        </section>
      )}
    </>
  );
};

export default CalendarItem;
