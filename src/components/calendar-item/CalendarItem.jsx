import './calendar-item.scss';
import { AiOutlinePlus } from 'react-icons/Ai';
import { useState } from 'react';
import CalendarEvent from '../calendar-event/CalendarEvent';
import AddEventPopup from '../add-event-popup/AddEventPopup';
import { TASKS_COLORS } from '../../helpers/colors';

const CalendarItem = ({ currentMonth, day, isSunday, isToday, events }) => {
  const [isPopupOpen, setIsPopUpOpen] = useState(false);
  const [eventName, setEventName] = useState('');
  const [eventColor, setEventColor] = useState(TASKS_COLORS[0]);

  const openPopup = () => setIsPopUpOpen(true);
  const closePopup = () => setIsPopUpOpen(false);

  const handleEventNameChange = (e) => setEventName(e.target.value);
  const handleEventColorChange = (color) => setEventColor(color);

  return (
    <section
      className={`calendar-item ${isToday ? 'calendar-item__selected' : ''}`}
      style={{ opacity: !currentMonth && 0.8 }}
    >
      <section className="calendar-item__header">
        <p style={{ color: isSunday && 'var(--clr-red)' }}>{day}</p>
        {currentMonth && <AiOutlinePlus className="calendar-item__add-event" onClick={openPopup} />}
      </section>
      <section className="calendar-item__events">
        <CalendarEvent />
        <CalendarEvent />
        <CalendarEvent />
      </section>
      {isPopupOpen && (
        <AddEventPopup
          closePopup={closePopup}
          eventName={eventName}
          handleEventNameChange={handleEventNameChange}
          eventColor={eventColor}
          handleEventColorChange={handleEventColorChange}
        />
      )}
    </section>
  );
};

export default CalendarItem;
