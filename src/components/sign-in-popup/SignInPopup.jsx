import { useState } from 'react';
import { useDispatch } from 'react-redux';
import InputField from '../input-field/InputField';
import Button from '../button/Button';
import './sign-in-popup.scss';
import { logInUser } from '../../features/user/userSlice';
import { Link } from 'react-router-dom';

const SignInPopup = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleGoogleSignIn = async () => {
    try {
      dispatch(logInUser());
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <section className="sign-in">
      <section className="sign-in__popup">
        <h2 className="sign-in__heading">Sign In</h2>
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
            <Link to={'/'}>Sign Up.</Link>
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
      </section>
    </section>
  );
};

export default SignInPopup;
