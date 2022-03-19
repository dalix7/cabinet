import React, { useEffect, useState } from "react";

import { Form, Formik } from "formik";
import { Accounts } from "meteor/accounts-base";
import * as Yup from "yup";

import EntrySelect from "../../../../components/Entry/EntrySelect/EntrySelect";
import { optionsLocation, optionsProfession } from "./options";
import "./styles.scss";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import snackBar from "../../../../../libs/snackBar";
import EntryText from "../../../Entry/EntryText/EntryText";
import modal from "../../../../../libs/modal";

const INITIAL_STATE = {
  name: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
  specialty: "",
  location: "",
};

const FORM_VALIDATION = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  lastName: Yup.string().required("Last name is required"),
  email: Yup.string()
    .email("Enter a valid email")
    .required("Email is required"),
  password: Yup.string().required("Enter valid password"),
  confirmPassword: Yup.string()
    .required("Enter valid password")
    .oneOf([Yup.ref("password"), null], "Passwords must match"),

  specialty: Yup.string().required("specialty is required"),
  location: Yup.string().required("specialty is required"),
});

const SignUpPro = () => {
  const navigate = useNavigate();
  const [showPass, setshowPass] = useState(false);
  const handleClickShowPassword = () => {
    setshowPass(!showPass);
  };
  const handleSubmit = (values, resetForm) => {
    console.log(values);
    Accounts.createUser(
      { email: values.email, password: values.password },

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
                profile: {
                  bio: "",
                  name: values.name,
                  lastName: values.lastName,
                  location: values.location,
                  professionalSpecialty: values.specialty,
                  isProvider: true,
                  isAdmin: false,
                  isClient: false,
                  createdAt: Date.now(),
                  fullName: `${values.name} ${values.lastName}`,
                  isOnline: true,
                },
              },
            },
            (err) => {
              if (err) {
                console.log(err);
              } else {
                snackBar.set("snackbar", {
                  open: true,
                  msg: `hello ${Meteor.user()?.profile?.name}`,
                  severity: "success",
                });
                modal.set("modalSignUp", {
                  open: false,
                });
                resetForm();
              }
            }
          );
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
    <div className="signUpPro">
      <Formik
        initialValues={{ ...INITIAL_STATE }}
        validationSchema={FORM_VALIDATION}
        onSubmit={(values, { resetForm }) => handleSubmit(values, resetForm)}
      >
        {({ isValid, dirty }) => {
          return (
            <Form>
              <div className="signUpPro__group">
                <div className="form-group form-focus">
                  <label className="focus-label">Name</label>
                  <EntryText
                    name="name"
                    placeholder="Enter your Name"
                  ></EntryText>
                </div>
                <div className="form-group form-focus">
                  <label className="focus-label">Last Name</label>
                  <EntryText
                    name="lastName"
                    placeholder="Enter your last name"
                  ></EntryText>
                </div>
              </div>

              <div className="form-group form-focus">
                <label className="focus-label">Email</label>
                <EntryText
                  name="email"
                  placeholder="Enter your Password Address"
                ></EntryText>
              </div>
              <div className="signUpPro__group">
                <div className="form-group form-focus">
                  <label className="focus-label">Specialty</label>
                  <EntrySelect
                    placeholder="specialty"
                    name="specialty"
                    options={optionsProfession}
                  ></EntrySelect>
                </div>
                <div className="form-group form-focus">
                  <label className="focus-label">Location</label>
                  <EntrySelect
                    placeholder="location"
                    name="location"
                    options={optionsLocation}
                  ></EntrySelect>
                </div>
              </div>
              <div className="form-group form-focus">
                <label className="focus-label">Password</label>
                <EntryText
                  name="password"
                  placeholder="Enter your Password Address"
                  type={showPass ? "text" : "password"}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={handleClickShowPassword}
                          edge="end"
                        >
                          {showPass ? (
                            <VisibilityOffIcon />
                          ) : (
                            <VisibilityIcon />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                ></EntryText>
              </div>
              <div className="form-group form-focus">
                <label className="focus-label">Confirm Password</label>
                <EntryText
                  name="confirmPassword"
                  placeholder="confirm your Password Address"
                  type={showPass ? "text" : "password"}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={handleClickShowPassword}
                          edge="end"
                        >
                          {showPass ? (
                            <VisibilityOffIcon />
                          ) : (
                            <VisibilityIcon />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                ></EntryText>
              </div>
              <div className="text-end">
                <span
                  onClick={() => {
                    modal.set("modalSignUp", {
                      open: false,
                    });
                    modal.set("modalLogIn", {
                      open: true,
                    });
                  }}
                  className="forgot-link"
                >
                  Already have an account?
                </span>
              </div>
              <div className="d-grid">
                <button
                  disabled={!(isValid && dirty)}
                  className="btn btn-primary btn-block btn-lg login-btn"
                  type="submit"
                >
                  SingUp
                </button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default SignUpPro;
