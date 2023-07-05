import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import InputField from '../input-field/InputField';
import Button from '../button/Button';
import './sign-in-popup.scss';
import {
  getUserError,
  getUserStatus,
  signInUser,
  signInUserWithEmailAndPassword,
  toogleSignInPopup,
} from '../../features/user/userSlice';
import { Link, useNavigate } from 'react-router-dom';
import { AiOutlineClose } from 'react-icons/Ai';
import { useRef } from 'react';
import { useClickToClose } from '../../hooks/useClickToClose';
import { ImSpinner2 } from 'react-icons/im';
import { ACTION_STATUS } from '../../utils/reducer/reducer.utils';

const SignInPopup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const error = useSelector(getUserError);
  const status = useSelector(getUserStatus);
  const popup = useRef();

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleGoogleSignIn = () => {
    dispatch(signInUser(() => navigate('/')));
  };

  const handleCloseSignInPopup = () => dispatch(toogleSignInPopup(false));

  useClickToClose(popup, handleCloseSignInPopup);

  const handleSignInWithEmailAndPassowrd = (e) => {
    e.preventDefault();
    dispatch(signInUserWithEmailAndPassword({ email, password }));
  };

  return (
    <section className="sign-in" ref={popup}>
      <section className="sign-in__popup">
        <h2 className="sign-in__heading">Sign In</h2>
        {error && <p className="sign-in__error">Error: {error}</p>}
        <form className="sign-in__form" onSubmit={handleSignInWithEmailAndPassowrd}>
          <InputField
            label="E-mail"
            labelFor="email"
            type="email"
            value={email}
            onChange={handleEmailChange}
          />
          <InputField
            label="Password"
            labelFor="password"
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
          <p className="sign-in__create-account">
            Don't have an account?
            <Link to={'/sign-up'} className="sign-in__sign-up-link">
              Sign Up.
            </Link>
          </p>
          {status === ACTION_STATUS.PENDING ? (
            <Button disabled>
              {' '}
              <ImSpinner2 className="spinner" />
            </Button>
          ) : (
            <Button>Sign In</Button>
          )}
        </form>
        <Button
          buttonType="google"
          handleOnClick={handleGoogleSignIn}
          style={{ marginTop: '1rem', width: '100%' }}
        >
          Sign In With Google
        </Button>
        <AiOutlineClose className="sign-in__close" onClick={handleCloseSignInPopup} />
      </section>
    </section>
  );
};

export default SignInPopup;
