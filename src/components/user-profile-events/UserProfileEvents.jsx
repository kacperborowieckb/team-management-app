import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCalendarEvents, getCurrentEvents } from '../../features/calendar/calendarSlice';
import { MONTHS } from '../../helpers/months';
import CalendarEvent from '../calendar-event/CalendarEvent';
import './user-profile-events.scss';

const UserProfileEvents = ({ group, searchValue }) => {
  const dispatch = useDispatch();
  const events = useSelector(getCurrentEvents);

  const filterDates = (date) => {
    return Object.keys(events[date]).some((day) => filterDays(date, day));
  };

  const filterDays = (date, day) => {
    return events[date][day].some(filterEvents);
  };

  const filterEvents = ({ description, name }) => {
    return (
      description.toLowerCase().includes(searchValue.toLowerCase()) ||
      name.toLowerCase().includes(searchValue.toLowerCase())
    );
  };

  useEffect(() => {
    dispatch(fetchCalendarEvents({ groupId: group }));
  }, [group]);

  return (
    <section className="user-profile-events">
      <h2 className="user-profile-events__heading">Events</h2>
      {Object.keys(events).length > 0 ? (
        Object.keys(events)
          .filter(filterDates)
          .map((date, i) => {
            return (
              <section className="user-profile-events__item" key={i}>
                <p className="user-profile-events__date">
                  {date.slice(0, 4) + ' ' + MONTHS[date.slice(4)]}
                </p>
                <section className="user-profile-events__month">
                  {Object.keys(events[date])
                    .filter((day) => filterDays(date, day))
                    .map((day, i) => {
                      return (
                        <section className="user-profile-events__day-container" key={i}>
                          <p className="user-profile-events__day">
                            {day < 10 ? '0' + day + ':' : day + ':'}
                          </p>
                          <section className="user-profile-events__events">
                            {events[date][day].filter(filterEvents).map((events, i) => {
                              const { color, createdAt, createdBy, description, name, eventId } =
                                events;
                              return (
                                <CalendarEvent
                                  color={color}
                                  createdAt={createdAt}
                                  createdBy={createdBy}
                                  description={description}
                                  name={name}
                                  eventId={eventId}
                                  day={day}
                                  key={i}
                                />
                              );
                            })}
                          </section>
                        </section>
                      );
                    })}
                </section>
              </section>
            );
          })
      ) : (
        <h3 className="user-profile-events__no-events">Empty here.</h3>
      )}
    </section>
  );
};

export default UserProfileEvents;
