import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import InputField from '../input-field/InputField';
import Button from '../button/Button';
import './sign-in-popup.scss';
import { getUserError, signInUser, toogleSignInPopup } from '../../features/user/userSlice';
import { Link } from 'react-router-dom';
import { AiOutlineClose } from 'react-icons/Ai';

const SignInPopup = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const error = useSelector(getUserError);

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleGoogleSignIn = () => dispatch(signInUser());

  const handleCloseSignInPopup = () => dispatch(toogleSignInPopup(false));

  return (
    <section className="sign-in">
      <section className="sign-in__popup">
        <h2 className="sign-in__heading">Sign In</h2>
        {error && <p className="sign-in__error">Error: {error}</p>}
        <form className="sign-in__form">
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
          <Button>Sign In</Button>
        </form>
        <Button
          type="google"
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
