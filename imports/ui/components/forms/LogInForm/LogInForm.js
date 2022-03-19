import React, { useEffect, useState } from "react";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

import EntryText from "../../Entry/EntryText/EntryText";
import snackBar from "../../../../libs/snackBar";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import modal from "../../../../libs/modal";
import "./style.scss";
const INITIAL_STATE = {
  email: "",
  password: "",
};

const FORM_VALIDATION = Yup.object().shape({
  email: Yup.string().email("Enter a valid email").required("Is required"),
  password: Yup.string().required("Enter valid password"),
});

const LogInForm = () => {
  let navigate = useNavigate();
  const [showPass, setshowPass] = useState(false);
  const handleClickShowPassword = () => {
    setshowPass(!showPass);
  };

  const handleSubmit = (values, resetForm) => {
    Meteor.loginWithPassword(
      { email: values.email },
      values.password,
      (err) => {
        if (err) {
          snackBar.set("snackbar", {
            open: true,
            msg: err.reason,
            severity: "error",
          });
        } else {
          Meteor.users.update(
            { _id: Meteor.user()._id },
            {
              $set: {
                "profile.isOnline": true,
              },
            }
          );
          snackBar.set("snackbar", {
            open: true,
            msg: `hello ${Meteor.user()?.profile?.name}`,
            severity: "success",
          });
          modal.set("modalLogIn", {
            open: false,
          });
          resetForm();
        }
      }
    );
  };
  useEffect(() => {
    if (Meteor.userId()) {
      navigate("/", { replace: true });
    }
  }, [Meteor.userId()]);
  return (
    <Formik
      initialValues={{ ...INITIAL_STATE }}
      validationSchema={FORM_VALIDATION}
      onSubmit={(values, { resetForm }) => handleSubmit(values, resetForm)}
    >
      {({ isValid, dirty }) => {
        return (
          <Form>
            <div className="form-group form-focus">
              <label className="focus-label">Email</label>
              <EntryText
                name="email"
                placeholder="Enter your Email Address"
              ></EntryText>
            </div>
            <div className="form-group form-focus">
              <label className="focus-label">Password</label>
              <EntryText
                name="password"
                variant="outlined"
                placeholder="Enter your Password"
                type={showPass ? "text" : "password"}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleClickShowPassword} edge="end">
                        {showPass ? <VisibilityOffIcon /> : <VisibilityIcon />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              ></EntryText>
            </div>
            <div className="text-right"></div>
            <div className="d-grid">
              <button
                disabled={!(isValid && dirty)}
                className="btn btn-primary btn-block btn-lg login-btn"
                type="submit"
              >
                Login
              </button>
            </div>
            <div className="login-or">
              <span className="or-line"></span>
              <span className="span-or">or</span>
            </div>
            <div className="row form-row social-login">
              <div className="col-6 d-grid">
                <a href="#" className="btn btn-facebook btn-block">
                  <i className="fab fa-facebook-f ms-0 mx-1"></i> Login
                </a>
              </div>
              <div className="col-6 d-grid">
                <a href="#" className="btn btn-google btn-block">
                  <i className="fab fa-google ms-0 mx-1"></i> Login
                </a>
              </div>
            </div>
            <div className="text-center dont-have">
              Don’t have an account?
              <span
                onClick={() => {
                  modal.set("modalLogIn", {
                    open: false,
                  });
                  modal.set("modalSignUp", {
                    open: true,
                  });
                }}
                className="register-btn"
              >
                Register
              </span>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default LogInForm;
