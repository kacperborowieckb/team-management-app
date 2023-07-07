import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CalendarItem from '../../components/calendar-item/CalendarItem';
import { getCurrentDate, setDate } from '../../features/calendar/calendarSlice';
import { generateMonthArray, getDaysInMonth } from '../../utils/calendar/calendar.utils';
import './calendar.scss';

const Calendar = () => {
  const dispatch = useDispatch();
  const currentDate = useSelector(getCurrentDate);

  useEffect(() => {
    const today = new Date();
    dispatch(
      setDate(
        today.getDate(),
        today.getMonth() + 1,
        today.getFullYear(),
        getDaysInMonth(today.getMonth() + 1, today.getFullYear())
      )
    );
  }, []);

  return (
    <section className="calendar">
      {currentDate ? (
        <>
          {/* <section className="calendar__heading-container">
            <h1 className="calendar__heading">{currentGroup.name + ' Calendar'}</h1>
          </section> */}
          <section className="calendar__container">
            {generateMonthArray(currentDate).map((date, i) => (
              <CalendarItem
                key={i}
                currentMonth={date.currentMonth}
                day={date.day}
                isSunday={(i + 1) % 7 === 0}
              />
            ))}
          </section>
        </>
      ) : (
        <div>loading</div>
      )}
    </section>
  );
};

export default Calendar;
