import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../components/button/Button';
import InputField from '../../components/input-field/InputField';
import {
  getIsSignInPopupOpen,
  getUserError,
  toogleSignInPopup,
} from '../../features/user/userSlice';
import './sign-up.scss';

const SignUp = () => {
  const dispatch = useDispatch();
  const error = useSelector(getUserError);
  const isPopUpOpen = useSelector(getIsSignInPopupOpen);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleConfirmPasswordChange = (e) => setConfirmPassword(e.target.value);

  useEffect(() => {
    if (isPopUpOpen) dispatch(toogleSignInPopup(false));
  }, []);

  return (
    <section className="sign-up">
      <section className="sign-up__container">
        <h1 className="sign-up__heading">Sign Up</h1>
        {error && <p className="sign-up__error">Error: {error}</p>}
        <form className="sign-up__form">
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
          <InputField
            label="Confirm Password"
            labelFor="confirm-password"
            type="password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
          />
          <Button>Sign In</Button>
        </form>
      </section>
    </section>
  );
};

export default SignUp;
