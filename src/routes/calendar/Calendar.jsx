import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CalendarItem from '../../components/calendar-item/CalendarItem';
import {
  decreaseMonth,
  fetchCalendarEvents,
  getCurrentDate,
  getCurrentEvents,
  increaseMonth,
  setDate,
} from '../../features/calendar/calendarSlice';
import { generateMonthArray, getDaysInMonth } from '../../utils/calendar/calendar.utils';
import { GrFormNext } from 'react-icons/gr';
import { MONTHS } from '../../helpers/months';
import './calendar.scss';
import { useParams } from 'react-router';
import { DAYS } from '../../helpers/days';

const Calendar = () => {
  const dispatch = useDispatch();
  const { groupId } = useParams();
  const currentDate = useSelector(getCurrentDate);
  const yearAndMonth = `${currentDate.year}${currentDate.month}`;
  const events = useSelector(getCurrentEvents);

  const handleIncreaseMonth = () => dispatch(increaseMonth());
  const handleDecreaseMonth = () => dispatch(decreaseMonth());

  useEffect(() => {
    dispatch(fetchCalendarEvents({ groupId }));
  }, [groupId]);

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
          <section className="calendar__scroll-box">
            <section className="calendar__container">
              {DAYS.map((day) => (
                <p className="calendar__day">{day}</p>
              ))}
              {generateMonthArray(currentDate).map((date, i) => (
                <CalendarItem
                  key={i}
                  currentDate={currentDate}
                  currentMonth={date.currentMonth}
                  day={date.day}
                  isSunday={(i + 1) % 7 === 0}
                  isToday={
                    date.day === currentDate.day &&
                    currentDate.month === new Date().getMonth() + 1 &&
                    date.currentMonth
                  }
                  events={
                    events.hasOwnProperty(yearAndMonth) && events[yearAndMonth][date.day]
                      ? events[yearAndMonth][date.day]
                      : []
                  }
                />
              ))}
            </section>
          </section>
        </>
      ) : (
        <div>loading</div>
      )}
    </section>
  );
};

export default Calendar;
