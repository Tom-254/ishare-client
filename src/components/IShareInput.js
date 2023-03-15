import React from "react";

const IShareInput = ({
  containerStyle,
  labelName,
  placeHolder,
  labelStyle,
  inputStyle,
  isRequired,
  inputType,
  inputValue,
  inputName,
  onChange,
  error,
  input,
}) => {
  return (
    <div className={`${containerStyle ? containerStyle : "input-container"}`}>
      <label className={`${labelStyle ? labelStyle : "input-label"}`}>
        {labelName}
      </label>
      {!inputType ? (<>
        <input
          type={ input ? input : "text"}
          className={`${inputStyle ? inputStyle : "input-field field"}`}
          placeholder={placeHolder}
          required={isRequired}
          value={inputValue}
          name={inputName}
          onChange={onChange}
        />
        {error ? <p className="error">{error}</p> : <p style={{color: "white"}}>Ok</p>}</>
      ) : (
        <>
        <textarea
          type="text"
          className={`${inputStyle ? inputStyle : "input-field textarea"}`}
          placeholder={placeHolder}
          required={isRequired}
          value={inputValue}
          name={inputName}
          onChange={onChange}
          rows="4"
        />
        {error ? <p className="error">{error}</p> : <p style={{color: "green"}}>No error</p>}
        </>
      )}
    </div>
  );
};

export default IShareInput;
