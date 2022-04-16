import React, { useState } from "react";
import PropTypes from "prop-types";
import { Col } from "reactstrap";
import "../../styles/InstantForm.css";

const RenderInput = ({ inputObj, id, value, handleChange }) => {
  //   console.log(inputObj, id);
  const [showPassword, setShowPassword] = useState(false);
  const handleTextChange = async (event) => {
    let value = event.target.value;
    let validator = inputObj.validator;
    // console.log(value, "beforeisValid");
    if (validator) {
      const isValid = await validator.isValid(value);
      handleChange(id, { isError: !isValid, value });
    } else {
      handleChange(id, { isError: false, value });
    }
    // console.log(isValid, value, "afterisValid");
    if (inputObj.callback) inputObj.callback(value);
  };
  const handlePasswordView = () => setShowPassword((prevState) => !prevState);
  const handleCheckBoxChange = (event) => {
    // console.log(
    //   event.target.value,
    //   event.target.checked,
    //   value,
    //   inputObj,
    //   "fafa"
    // );
    //if checked
    const prevValues = [...value?.value];
    if (event.target.checked) {
      if ((inputObj?.limit || 1) === 1) {
        handleChange(id, { isError: false, value: [event.target.value] });
      }
      if (prevValues.length < (inputObj?.limit || 1)) {
        prevValues.push(event.target.value);
        handleChange(id, { isError: false, value: [...prevValues] });
      }
    } else {
      const filteredValues = prevValues.filter(
        (item) => item !== event.target.value
      );
      handleChange(id, { isError: false, value: [...filteredValues] });
    }
  };

  switch (inputObj.type) {
    case "text":
      return (
        <div
          className={`rif_formInput_container ${inputObj.inputContainerClass}`}
        >
          {inputObj.label && (
            <label
              htmlFor={id}
              className={`rif_formInput_label ${inputObj.inputLabelClass}`}
            >
              {inputObj.label}
            </label>
          )}
          {!inputObj.component ? (
            <input
              type={"text"}
              id={id}
              placeholder={inputObj.label}
              value={value?.value}
              onChange={handleTextChange}
              className={`rif_formInput_input ${
                value?.isError ? "with_error" : ""
              } ${inputObj.inputClass}`}
            />
          ) : (
            inputObj.component({
              value: value?.value,
              handleChange: handleTextChange,
            })
          )}
        </div>
      );
    case "password":
      return (
        <div
          className={`rif_formInput_container ${inputObj.inputContainerClass}`}
        >
          {inputObj.label && (
            <label
              htmlFor={id}
              className={`rif_formInput_label ${inputObj.inputLabelClass}`}
            >
              {inputObj.label}
            </label>
          )}
          {!inputObj.component ? (
            <span className="rif_formInput_input_span">
              <input
                type={showPassword ? "text" : "password"}
                id={id}
                placeholder={inputObj.label}
                value={value?.value}
                onChange={handleTextChange}
                className={`rif_formInput_password_input ${
                  value?.isError ? "with_error" : ""
                } ${inputObj.inputClass}`}
              />
              <button
                className={`rif_formInput_password_show_btn`}
                onClick={handlePasswordView}
              >
                {!showPassword ? (
                  inputObj.passwordHideIcon ? (
                    inputObj.passwordHideIcon
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="feather feather-eye"
                    >
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                      <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                  )
                ) : inputObj.passwordVisibleIcon ? (
                  inputObj.passwordVisibleIcon
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="feather feather-eye-off"
                  >
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                    <line x1="1" y1="1" x2="23" y2="23"></line>
                  </svg>
                )}
              </button>
            </span>
          ) : (
            inputObj.component({
              value: value?.value,
              handleChange: handleTextChange,
            })
          )}
        </div>
      );
    case "select":
      return (
        <div
          className={`rif_formInput_container ${inputObj.inputContainerClass}`}
        >
          {inputObj.label && (
            <label
              htmlFor={id}
              className={`rif_formInput_label ${inputObj.inputLabelClass}`}
            >
              {inputObj.label}
            </label>
          )}
          {!inputObj.component ? (
            <select
              value={value?.value}
              onChange={handleTextChange}
              className={`rif_formInput_input ${
                value?.isError ? "with_error" : ""
              } ${inputObj.inputClass}`}
            >
              {inputObj.optionArray.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          ) : (
            inputObj.component({
              value: value?.value,
              handleChange: handleTextChange,
              optionArray: inputObj.optionArray,
            })
          )}
        </div>
      );
    case "textarea":
      return (
        <div
          className={`rif_formInput_container ${inputObj.inputContainerClass}`}
        >
          {inputObj.label && (
            <label
              htmlFor={id}
              className={`rif_formInput_label ${inputObj.inputLabelClass}`}
            >
              {inputObj.label}
            </label>
          )}
          {!inputObj.component ? (
            <textarea
              id={id}
              placeholder={inputObj.label}
              value={value?.value}
              onChange={handleTextChange}
              className={`rif_formInput_input rif_formInput_textarea ${
                value?.isError ? "with_error" : ""
              } ${inputObj.inputClass}`}
            ></textarea>
          ) : (
            inputObj.component({
              value: value?.value,
              handleChange: handleTextChange,
            })
          )}
        </div>
      );
    case "checkbox":
      return (
        <div
          className={`rif_formInput_container ${inputObj.inputContainerClass}`}
        >
          {inputObj.label && (
            <label
              htmlFor={id}
              className={`rif_formInput_label ${inputObj.inputLabelClass}`}
            >
              {inputObj.label}
            </label>
          )}
          {!inputObj.component
            ? inputObj.optionArray.map((option) => (
                <label className={`rif_formInput_checkbox_label`}>
                  <input
                    type={"checkbox"}
                    onChange={handleCheckBoxChange}
                    value={option}
                    checked={value?.value?.includes(option)}
                    className={`rif_formInput_input  ${inputObj.inputClass}`}
                  />
                  {option}
                </label>
              ))
            : inputObj.component({
                value: value?.value,
                handleChange: handleTextChange,
                optionArray: inputObj.optionArray,
              })}
        </div>
      );
    case "radio":
      return (
        <div
          className={`rif_formInput_container ${inputObj.inputContainerClass}`}
        >
          {inputObj.label && (
            <label
              htmlFor={id}
              className={`rif_formInput_label ${inputObj.inputLabelClass}`}
            >
              {inputObj.label}
            </label>
          )}
          {!inputObj.component
            ? inputObj.optionArray.map((option) => (
                <label className={`rif_formInput_checkbox_label`}>
                  <input
                    type={"radio"}
                    onChange={handleCheckBoxChange}
                    value={option}
                    checked={value?.value?.includes(option)}
                    className={`rif_formInput_input  ${inputObj.inputClass}`}
                  />
                  {option}
                </label>
              ))
            : inputObj.component({
                value: value?.value,
                handleChange: handleTextChange,
                optionArray: inputObj.optionArray,
              })}
        </div>
      );

    default:
      return <input type={"text"} />;
  }
};

const FormInput = ({ inputObj, id, value, handleChange }) => {
  return (
    <Col sm={12} md={inputObj.width || 6}>
      <RenderInput
        inputObj={inputObj}
        id={id}
        value={value}
        handleChange={handleChange}
      />
    </Col>
  );
};

FormInput.propTypes = {
  inputObj: PropTypes.object,
  id: PropTypes.string,
  value: PropTypes.any,
  handleChange: PropTypes.func,
};

export default FormInput;
