import './button.scss';

const BUTTON_TYPES = {
  default: 'button__default',
  google: 'button__google',
  signIn: 'button__sign-in',
};

const Button = ({ buttonType = 'default', handleOnClick, children, ...otherProps }) => {
  return (
    <button
      className={`button ${BUTTON_TYPES[buttonType]}`}
      onClick={handleOnClick}
      {...otherProps}
    >
      {children}
    </button>
  );
};

export default Button;
