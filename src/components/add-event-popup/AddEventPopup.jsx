import Popup from '../popup/Popup';
import InputField from '../input-field/InputField';
import ColorSelector from '../color-selector/ColorSelector';
import Button from '../button/Button';
import { useDispatch, useSelector } from 'react-redux';
import { TASKS_COLORS } from '../../helpers/colors';
import { useState } from 'react';
import { addNewEvent, getCalendarStatus } from '../../features/calendar/calendarSlice';
import { useParams } from 'react-router';
import { ACTION_STATUS } from '../../utils/reducer/reducer.utils';
import { ImSpinner2 } from 'react-icons/im';

const AddEventPopup = ({ closePopup, currentDate, day }) => {
  const dispatch = useDispatch();
  const { groupId } = useParams();
  const status = useSelector(getCalendarStatus);
  const [eventName, setEventName] = useState('');
  const [eventDescription, setEventDesciption] = useState('');
  const [eventColor, setEventColor] = useState(TASKS_COLORS[0]);

  const handleEventNameChange = (e) => setEventName(e.target.value);
  const handleEventDescriptionChange = (e) => setEventDesciption(e.target.value);
  const handleEventColorChange = (color) => setEventColor(color);

  const date = `${currentDate.year}${currentDate.month}`;
  const handleAddNewEvent = () =>
    dispatch(
      addNewEvent({ eventName, eventDescription, eventColor, date, day, groupId, closePopup })
    );

  return (
    <Popup heading={'Add Event'} handleClosePopUp={closePopup} error={''}>
      <section style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        <InputField
          label={'Event name'}
          labelFor={'event-name'}
          value={eventName}
          onChange={handleEventNameChange}
        />
        <InputField
          label={'Event Description'}
          labelFor={'event-description'}
          value={eventDescription}
          onChange={handleEventDescriptionChange}
        />
        <ColorSelector taskColor={eventColor} setTaskColor={handleEventColorChange} />
        {status === ACTION_STATUS.PENDING ? (
          <Button disabled>
            <ImSpinner2 className="spinner" />
          </Button>
        ) : (
          <Button handleOnClick={handleAddNewEvent}>Add Event</Button>
        )}
      </section>
    </Popup>
  );
};

export default AddEventPopup;
