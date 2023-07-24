import { useState } from 'react';
import TaskPopup from '../task-popup/TaskPopup';
import './calendar-event.scss';

const CalendarEvent = ({ color, name, description, createdAt, createdBy }) => {
  const [isEventPopupOpen, setIsEventPopupOpen] = useState(false);

  const closeEventPopup = () => setIsEventPopupOpen(false);
  const openEventPopup = () => setIsEventPopupOpen(true);

  return (
    <>
      <div className="calendar-event" style={{ backgroundColor: color }} onClick={openEventPopup}>
        {name}
      </div>
      {isEventPopupOpen && (
        <TaskPopup
          title={name}
          content={description}
          closePopup={closeEventPopup}
          color={color}
          createdAt={createdAt}
          createdBy={createdBy}
        />
      )}
    </>
  );
};

export default CalendarEvent;
