import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { getCurrentDate, setDate } from '../../features/calendar/calendarSlice';
import { generateMonthArray, getDaysInMonth } from '../../utils/calendar/calendar.utils';
import './calendar.scss';

const Calendar = () => {
  const dispatch = useDispatch();
  const currentDate = useSelector(getCurrentDate);
  const { groupId } = useParams();
  const currentGroup = useSelector((state) => state.groups.groups.find(({ id }) => id === groupId));

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
      {currentDate && currentGroup ? (
        <>
          <section className="calendar__heading-container">
            <h1 className="calendar__heading">{currentGroup.name + ' Calendar'}</h1>
          </section>
          <section className="calendar__container">
            {generateMonthArray(currentDate).map((item, i) => (
              <div key={i}>{item.day}</div>
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
