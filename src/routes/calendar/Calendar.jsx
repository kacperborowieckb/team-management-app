import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CalendarItem from '../../components/calendar-item/CalendarItem';
import {
  decreaseMonth,
  getCurrentDate,
  increaseMonth,
  setDate,
} from '../../features/calendar/calendarSlice';
import { generateMonthArray, getDaysInMonth } from '../../utils/calendar/calendar.utils';
import { GrFormNext } from 'react-icons/Gr';
import { MONTHS } from '../../helpers/months';
import './calendar.scss';

const Calendar = () => {
  const dispatch = useDispatch();
  const currentDate = useSelector(getCurrentDate);

  const handleIncreaseMonth = () => dispatch(increaseMonth());
  const handleDecreaseMonth = () => dispatch(decreaseMonth());

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
          <section className="calendar__nav">
            <GrFormNext className="calendar__previous" onClick={handleDecreaseMonth} />
            <h2 className="calendar__current-date">
              {`${currentDate.day} ${MONTHS[currentDate.month]} ${currentDate.year}`}
            </h2>
            <GrFormNext className="calendar__next" onClick={handleIncreaseMonth} />
          </section>
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
