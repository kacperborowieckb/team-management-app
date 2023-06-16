import './input-field.scss';

const InputField = ({ label, labelFor, ...otherProps }) => {
  return (
    <div className="input-field">
      <input
        className={`input-field__input ${otherProps.value.length && 'input-field__input-text'}`}
        id={labelFor}
        name={labelFor}
        {...otherProps}
      />
      <label
        className={`input-field__label ${otherProps.value.length && 'input-field__label-focused'}`}
        htmlFor={labelFor}
      >
        {label}
      </label>
    </div>
  );
};

export default InputField;
