import './calendar-event.scss';

const CalendarEvent = ({ color, name, description }) => {
  return (
    <div className="calendar-event" style={{ backgroundColor: color }}>
      {name}
    </div>
  );
};

export default CalendarEvent;
