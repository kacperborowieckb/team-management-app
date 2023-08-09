import './user-info.scss';
import { changeProfilePicture, getCurrentUser } from '../../features/user/userSlice';
import { ImFilePicture } from 'react-icons/im';
import Popup from '../../components/popup/Popup';
import { useRef, useState } from 'react';
import Button from '../../components/button/Button';
import { useDispatch, useSelector } from 'react-redux';

const UserInfo = () => {
  const user = useSelector(getCurrentUser);
  const input = useRef();
  const dispatch = useDispatch();
  const [isAcceptPicturePopupOpen, setIsAcceptPicturePopupOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);
  const [image, setImage] = useState(null);

  const openPopup = () => setIsAcceptPicturePopupOpen(true);
  const closePopup = () => {
    input.current.value = '';
    setIsAcceptPicturePopupOpen(false);
    setImage(null);
    setImageUrl(null);
  };

  const handleImagePick = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
      setImageUrl(URL.createObjectURL(e.target.files[0]));
    }

    openPopup();
  };

  const uploadImage = () => {
    dispatch(changeProfilePicture({ uid: user.uid, image, closePopup }));
  };

  const handleInputClick = () => {
    input.current.click();
  };

  return (
    <section className="user-info">
      <div className="user-info__profile-picture-container" onClick={handleInputClick}>
        <img
          src={`${user.url.length > 0 ? user.url : '/profile-picture.svg'}`}
          alt="profile-picture"
          className="user-info__profile-picture"
        />
        <ImFilePicture className="user-info__add-icon" />
      </div>
      <h1 className="user-info__username">{user.displayName}</h1>
      <h2 className="user-info__email">{user.email}</h2>
      <input
        type="file"
        accept="image/*"
        ref={input}
        className="user-info__input"
        onChange={(e) => handleImagePick(e)}
      />
      {isAcceptPicturePopupOpen && (
        <Popup heading={'Preview'} handleClosePopUp={closePopup}>
          <div className="user-info__preview-img">
            <img src={imageUrl} alt="profile-picture" className="user-info__profile-picture" />
          </div>
          <section className="user-info__button-section">
            <Button buttonType="accept" onClick={uploadImage}>
              Save
            </Button>
            <Button buttonType="decline" onClick={closePopup}>
              Cancel
            </Button>
          </section>
        </Popup>
      )}
    </section>
  );
};

export default UserInfo;
