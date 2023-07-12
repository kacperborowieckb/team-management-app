import './calendar-item.scss';
import { AiOutlinePlus } from 'react-icons/Ai';
import { useState } from 'react';
import CalendarEvent from '../calendar-event/CalendarEvent';
import AddEventPopup from '../add-event-popup/AddEventPopup';

const CalendarItem = ({ currentDate, currentMonth, day, isSunday, isToday, events }) => {
  const [isPopupOpen, setIsPopUpOpen] = useState(false);

  const openPopup = () => setIsPopUpOpen(true);
  const closePopup = () => setIsPopUpOpen(false);

  return (
    <section
      className={`calendar-item ${isToday ? 'calendar-item__selected' : ''}`}
      style={{ opacity: !currentMonth && 0.8 }}
    >
      <section className="calendar-item__header">
        <p style={{ color: isSunday && 'var(--clr-red)' }}>{day}</p>
        {currentMonth && <AiOutlinePlus className="calendar-item__add-event" onClick={openPopup} />}
      </section>
      {events.length > 0 && (
        <section className="calendar-item__events">
          {events.map((event, i) => (
            <CalendarEvent
              color={event.color}
              name={event.name}
              description={event.description}
              key={i}
            />
          ))}
        </section>
      )}
      {isPopupOpen && <AddEventPopup closePopup={closePopup} currentDate={currentDate} day={day} />}
    </section>
  );
};

export default CalendarItem;
