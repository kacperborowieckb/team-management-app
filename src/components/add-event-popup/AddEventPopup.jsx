import Popup from '../popup/Popup';
import InputField from '../input-field/InputField';
import ColorSelector from '../color-selector/ColorSelector';
import Button from '../button/Button';
import { useDispatch } from 'react-redux';

const AddEventPopup = ({
  closePopup,
  eventName,
  handleEventNameChange,
  eventColor,
  handleEventColorChange,
}) => {
  const dispatch = useDispatch();

  const handleAddNewEvent = () => {};

  return (
    <Popup heading={'Add Event'} handleClosePopUp={closePopup} error={''}>
      <section style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <InputField
          label={'Event name'}
          labelFor={'event-name'}
          value={eventName}
          onChange={handleEventNameChange}
        />
        <ColorSelector taskColor={eventColor} setTaskColor={handleEventColorChange} />
        <Button handleOnClick={handleAddNewEvent}>Add Event</Button>
      </section>
    </Popup>
  );
};

export default AddEventPopup;
