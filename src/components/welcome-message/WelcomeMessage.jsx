import './welcome-message.scss';
import Button from '../button/Button';
import { useDispatch } from 'react-redux';
import { toogleSignInPopup } from '../../features/user/userSlice';
import { useNavigate } from 'react-router';

const WelcomeMessage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleOpenSignInPopup = () => dispatch(toogleSignInPopup(true));

  const redirectToSignUp = () => navigate('/sign-up');

  return (
    <section className="welcome-message">
      <section className="welcome-message__container">
        <h1 className="welcome-message__heading">Hi!</h1>
        <p className="welcome-message__paragraph">Welcome to my project.</p>
        <p className="welcome-message__paragraph">To begin:</p>
        <section className="welcome-message__buttons">
          <Button handleOnClick={handleOpenSignInPopup}>SIGN IN</Button> OR
          <Button handleOnClick={redirectToSignUp}>SIGN UP</Button>
        </section>
      </section>
    </section>
  );
};

export default WelcomeMessage;
