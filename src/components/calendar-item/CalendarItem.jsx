import './calendar-item.scss';
import { AiOutlinePlus } from 'react-icons/Ai';

const CalendarItem = ({ currentMonth, day, isSunday }) => {
  return (
    <>
      {currentMonth ? (
        <section className="calendar-item">
          <p style={{ color: isSunday && 'var(--clr-red)' }}>{day}</p>
          <AiOutlinePlus className="calendar-item__add-event" />
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
