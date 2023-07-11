import './calendar-item.scss';
import { AiOutlinePlus } from 'react-icons/Ai';
import { useState } from 'react';
import CalendarEvent from '../calendar-event/CalendarEvent';

const CalendarItem = ({ currentMonth, day, isSunday, isToday, events }) => {
  const [isPopupOpen, setIsPopUpOpen] = useState(false);

  const openPopup = () => setIsPopUpOpen(true);
  const closePopup = () => setIsPopUpOpen(false);

  return (
    <section
      className={`calendar-item ${isToday ? 'calendar-item__selected' : ''}`}
      style={{ opacity: !currentMonth && 0.8 }}
    >
      <p style={{ color: isSunday && 'var(--clr-red)' }}>{day}</p>
      <AiOutlinePlus className="calendar-item__add-event" onClick={openPopup} />
      <section className="calendar-item__events">
        <CalendarEvent />
        <CalendarEvent />
        <CalendarEvent />
      </section>
    </section>
  );
};

export default CalendarItem;
