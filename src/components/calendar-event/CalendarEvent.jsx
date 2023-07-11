import './calendar-event.scss';

const CalendarEvent = ({ color = 'red', content = 'event content' }) => {
  return (
    <div className="calendar-event" style={{ backgroundColor: color }}>
      {content}
    </div>
  );
};

export default CalendarEvent;
