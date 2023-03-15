import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { AuthContext } from "../context/authContext";
import IShareButton from "../components/IShareButton";
import IShareInput from "../components/IShareInput";
import IShareLogo from "../components/IShareLogo";
import { isEmpty, values } from "lodash";

const SignUp = () => {
  const [inputs, setInputs] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirm_password: "",
  });

  const [errors, setErrors] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirm_password: "",
    general: "",
  });

  const { signup } = useContext(AuthContext);

  const navigate = useNavigate();

  const onChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    let isEmpty = false;

    if (!inputs.first_name) {
      setErrors((prev) => ({
        ...prev,
        first_name: "First Name is Required!",
      }));
    } else {
      setErrors((prev) => ({
        ...prev,
        first_name: "",
      }));
    }

    if (!inputs.last_name) {
      setErrors((prev) => ({
        ...prev,
        last_name: "Last Name is Required!",
      }));
    } else {
      setErrors((prev) => ({
        ...prev,
        last_name: "",
      }));
    }

    if (!inputs.email) {
      setErrors((prev) => ({
        ...prev,
        email: "Email is Required!",
      }));
    } else {
      setErrors((prev) => ({
        ...prev,
        email: "",
      }));
    }

    if (!inputs.password) {
      setErrors((prev) => ({
        ...prev,
        password: "Password is Required!",
      }));
    } else {
      setErrors((prev) => ({
        ...prev,
        password: "",
      }));
    }
    if (!inputs.confirm_password) {
      setErrors((prev) => ({
        ...prev,
        confirm_password: "Confirm Password is Required!",
      }));
    } else {
      setErrors((prev) => ({
        ...prev,
        confirm_password: "",
      }));
    }

    Object.keys(inputs).forEach(key => {
      if(inputs[key] === "")
          isEmpty = true;
    })

    if (!isEmpty) {
      try {
        await signup(inputs);
        navigate("/dashboard");
      } catch (error) {
        setErrors((prev) => ({
          ...prev,
          general: error.message,
        }))
      }
    }
  };

  return (
    <div className="flex-center content-container">
      <form className="flex-center__column form-container" onSubmit={onSubmit}>
        <IShareLogo />
        <div className="flex-column title-button__container">
          <p className="form-title">Let us help you create an account 😁</p>
          <div className="flex-column inputs-container">
            <div className="flex">
              <IShareInput
                inputValue={inputs.first_name}
                labelName={"First Name"}
                inputName="first_name"
                onChange={onChange}
                error={errors.first_name}
              />
              <IShareInput
                inputValue={inputs.last_name}
                labelName={"Last Name"}
                inputName="last_name"
                onChange={onChange}
                error={errors.last_name}
              />
            </div>
            <IShareInput
              inputValue={inputs.email}
              labelName={"Email"}
              inputName="email"
              onChange={onChange}
              error={errors.email}
              input={"email"}
            />
            <div className="flex">
              <IShareInput
                inputValue={inputs.password}
                labelName={"Password"}
                inputName="password"
                onChange={onChange}
                error={errors.password}
                input="password"
              />
              <IShareInput
                inputValue={inputs.confirm_password}
                labelName={"Confirm Password"}
                inputName="confirm_password"
                onChange={onChange}
                error={errors.confirm_password}
                input="password"
              />
            </div>
            <Link to="/" className="form-forgot-password">
              Forgot Password ?
            </Link>
            {errors.general && <p className="error">
              {errors.general}
            </p>}
          </div>
          <IShareButton buttonName={"Sign up"} buttonType="submit" />
        </div>
        <p className="form-account-message">
          Already have an account ?{" "}
          <Link to="/login" className="to-signup-signin">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
