import React, { useState } from "react";
import eyeOpen from "../../assets/icons/eye-open.svg";
import eyeClose from "../../assets/icons/eye-close.svg";
// import { toast } from "react-toastify";
const Input = ({
  type = "text",
  wrapperClass,
  className,
  inputClass,
  label,
  labelClass,
  onChange,
  name,
  id,
  value,
  placeholder,
  placeholderClass,
  icon,
  button,
  buttonLabel,
  buttonClass,
  maxWidth,
  maxHeight,
  minHeight,
  minWidth,
  height,
  width,
  maxLength,
  error,
  errorMessage,
  disabled = false,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const inputStyle = {
    inputClass: inputClass,
    placeholder: placeholder,
    height: height,
    minHeight: minHeight,
    maxHeight: maxHeight,
    width: width,
    minWidth: minWidth,
    maxWidth: maxWidth,
    placeholderClass: placeholderClass,
    icon: icon,
    label: label,
    labelClass: labelClass,
  };

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const getInputType = () => {
    if (type === "password") {
      return showPassword ? "text" : "password";
    } else {
      return type;
    }
  };

  const getInputIcon = () => {
    switch (type) {
      case "password":
        return showPassword ? eyeClose : eyeOpen;
      default:
        return icon;
    }
  };
  return (
    <>
      <div
        className={`input-box  ${error ? "error" : ""} ${className}`}
        style={inputStyle}
      >
        <label className={labelClass}>{label}</label>
        <div className="input-wrapper">
          <input
            autoComplete="off"
            type={getInputType()}
            id={id}
            name={name}
            value={value}
            onChange={onChange}
            className={inputClass}
            disabled={disabled}
            maxLength={maxLength}
            placeholder={placeholder}
            placeholderClass={placeholderClass}
            label={label}
            inputClass={inputClass}
            labelClass={labelClass}
          />
          {/* <label className={`text-capitalize ${labelClass}`}>{placeholder}</label> */}
          {icon && (
            <img
              src={getInputIcon()}
              alt="icon"
              className="pointer"
              onClick={togglePassword}
            />
          )}

          {button && (
            <button className={buttonClass} onClick={onButtonClick}>
              {buttonLabel}
            </button>
          )}
        </div>
        {errorMessage && (
          <p className="extra-small text-xs font-medium text-red-600">
            {errorMessage}
          </p>
        )}
      </div>
    </>
  );
};

export default Input;
