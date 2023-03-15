import React, { useContext, useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";

import IShareButton from "../components/IShareButton";
import IShareInput from "../components/IShareInput";
import IShareLogo from "../components/IShareLogo";

const Login = () => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const [ errors, setErrors] = useState({
    email: "",
    password: "",
    general: "",
  })

  const { signin } = useContext(AuthContext);

  const navigate = useNavigate();

  const onChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();


    if (!inputs.email) {
      setErrors((prev) => ({
        ...prev,
        email: "Email is Required!",
        general: "",
      }))
    }
    else {
      setErrors((prev) => ({
        ...prev,
        email: "",
        general: "",
      }))
    }

    if (!inputs.password) {
      setErrors((prev) => ({
        ...prev,
        password: "Password is Required!",
        general: "",
      }))
    } else {
      setErrors((prev) => ({
        ...prev,
        password: "",
        general: "",
      }))
    }

    if (inputs.email && inputs.password) {
      try {
        await signin(inputs);
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
          <p className="form-title">Hello 👋 welcome back</p>
          <div className="flex-column inputs-container">
            <IShareInput
              inputValue={inputs.email}
              labelName={"Email"}
              inputName="email"
              onChange={onChange}
              // isRequired={true}
              error={errors.email}
              input="email"
            />
            <IShareInput
              inputValue={inputs.password}
              labelName={"Password"}
              inputName="password"
              onChange={onChange}
              // isRequired={true}
              input="password"
              error={errors.password}
            />
            <Link to="/" className="form-forgot-password">
              Forgot Password ?
            </Link>
            {errors.general && <p className="error">
              {errors.general}
            </p>}
          </div>
          <IShareButton buttonName={"Login"} buttonType="submit" />
        </div>
        <p className="form-account-message">
          Don’t have an account ?{" "}
          <Link to="/signup" className="to-signup-signin">
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
