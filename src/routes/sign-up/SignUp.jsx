import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import Button from '../../components/button/Button';
import InputField from '../../components/input-field/InputField';
import {
  getIsSignInPopupOpen,
  getUserError,
  getUserStatus,
  setError,
  signUpUser,
  toogleSignInPopup,
} from '../../features/user/userSlice';
import { ACTION_STATUS } from '../../utils/reducer/reducer.utils';
import { ImSpinner2 } from 'react-icons/im';
import './sign-up.scss';

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const error = useSelector(getUserError);
  const status = useSelector(getUserStatus);
  const isPopUpOpen = useSelector(getIsSignInPopupOpen);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [displayName, setDisplayNameChange] = useState('');

  const canCreate = password === confirmPassword && displayName.length;

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleConfirmPasswordChange = (e) => setConfirmPassword(e.target.value);
  const handleDisplayNameChange = (e) => setDisplayNameChange(e.target.value);

  const handleCreateUserWithEmailAndPassword = (e) => {
    e.preventDefault();
    if (canCreate)
      dispatch(
        signUpUser({ email, displayName, password, navigateToHomePage: () => navigate('/') })
      );
  };

  useEffect(() => {
    if (isPopUpOpen) dispatch(toogleSignInPopup(false));
    if (error) dispatch(setError(null));
  }, []);

  return (
    <section className="sign-up">
      <section className="sign-up__container">
        <h1 className="sign-up__heading">Sign Up</h1>
        {error && <p className="sign-up__error">Error: {error}</p>}
        <form className="sign-up__form" onSubmit={handleCreateUserWithEmailAndPassword}>
          <InputField
            label="E-mail"
            labelFor="email"
            type="email"
            value={email}
            onChange={handleEmailChange}
          />
          <InputField
            label="Display name"
            labelFor="display-name"
            type="text"
            value={displayName}
            onChange={handleDisplayNameChange}
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
          {status === ACTION_STATUS.PENDING ? (
            <Button disabled>
              <ImSpinner2 className="spinner" />
            </Button>
          ) : (
            <Button>Sign Up</Button>
          )}
        </form>
      </section>
    </section>
  );
};

export default SignUp;
