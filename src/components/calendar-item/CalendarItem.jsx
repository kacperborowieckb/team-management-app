import './calendar-item.scss';

const CalendarItem = ({ currentMonth, day }) => {
  return (
    <section className="calendar-item" style={{ color: !currentMonth && 'grey' }}>
      {day}
    </section>
  );
};

export default CalendarItem;
