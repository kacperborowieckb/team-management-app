import Button from '../button/Button';
import Popup from '../popup/Popup';
import './remove-user-popup.scss';

const RemoveUserPopup = ({
  isQuitGroupPopupOpen,
  toogleAcceptQuitGroup,
  toogleAcceptRemoveUser,
  error,
  displayName,
  handleRemoveUser,
}) => {
  return (
    <Popup
      heading={isQuitGroupPopupOpen ? 'Quit group' : 'Remove user'}
      handleClosePopUp={isQuitGroupPopupOpen ? toogleAcceptQuitGroup : toogleAcceptRemoveUser}
      error={error}
    >
      <p className="remove-user-popup__accept-popup-paragraph">
        {isQuitGroupPopupOpen
          ? 'Are you sure you want to quit?'
          : `Are you sure you want remove ${displayName} from group?`}
      </p>
      <section className="remove-user-popup__accept-popup-buttons">
        <Button
          buttonType="decline"
          handleOnClick={isQuitGroupPopupOpen ? toogleAcceptQuitGroup : toogleAcceptRemoveUser}
        >
          No
        </Button>
        <Button buttonType="accept" handleOnClick={handleRemoveUser}>
          Yes
        </Button>
      </section>
    </Popup>
  );
};

export default RemoveUserPopup;
