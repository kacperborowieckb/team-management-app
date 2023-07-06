import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentDate, setDate } from '../../features/calendar/calendarSlice';
import './calendar.scss';

const Calendar = () => {
  const dispatch = useDispatch();
  const currentDate = useSelector(getCurrentDate);

  useEffect(() => {
    const today = new Date();
    console.log(today);
    // dispatch(setDate());
  }, []);

  return <section className="calendar">Calendar</section>;
};

export default Calendar;
