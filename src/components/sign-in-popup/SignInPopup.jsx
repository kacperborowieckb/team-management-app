import { useState } from 'react';
import InputField from '../input-field/InputField';
import './sign-in-popup.scss';

const SignInPopup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  return (
    <section className="sign-in">
      <section className="sign-in__popup">
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
        </form>
      </section>
    </section>
  );
};

export default SignInPopup;
