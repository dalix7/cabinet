import React from "react";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import EntryText from "../../../components/Entry/EntryText/EntryText";
import { Button } from "@mui/material";
import AddSkill from "../AddSkill/AddSkill";
import { useTracker } from "meteor/react-meteor-data";
import modal from "../../../../libs/modal";
const FORM_VALIDATION = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  lastName: Yup.string().required("Last name is required"),
  about: Yup.string().required("Enter your bio"),
});

// const INITIAL_STATE = {
//   name: "",
//   lastName: "",
//   about: "",
// };
const EditProfileProvider = () => {
  const INITIAL_STATE = useTracker(() => {
    const user = Meteor.user();
    return {
      name: user?.profile.name,
      lastName: user?.profile.lastName,
      about: user?.profile.bio,
    };
  });
  const handleSubmit = (values, resetForm) => {
    Meteor.users.update(
      { _id: Meteor.user()._id },
      {
        $set: {
          "profile.name": values.name,
          "profile.lastName": values.lastName,
          "profile.bio": values.about,
        },
      },
      () => {
        modal.set("modalEditProvider", {
          open: false,
        });
      }
    );
  };
  return (
    <div>
      <Formik
        initialValues={{ ...INITIAL_STATE }}
        validationSchema={FORM_VALIDATION}
        onSubmit={(values, { resetForm }) => handleSubmit(values, resetForm)}
      >
        {({ isValid, dirty }) => {
          return (
            <Form>
              <div className="signUpPro__entry">
                <EntryText
                  name="name"
                  label="Name"
                  variant="outlined"
                  placeholder="Enter your Name"
                ></EntryText>
              </div>
              <div className="signUpPro__entry">
                <EntryText
                  name="lastName"
                  label="Last Name"
                  variant="outlined"
                  placeholder="Enter your last name"
                ></EntryText>
              </div>
              <div className="signUpPro__entry">
                <EntryText
                  name="about"
                  label="About me"
                  variant="outlined"
                  placeholder="Enter your bio"
                  multiline
                  rows="7"
                ></EntryText>
              </div>

              <div className="login-btn">
                <Button
                  variant="contained"
                  type="submit"
                  disabled={!(isValid && dirty)}
                >
                  Confirm
                </Button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default EditProfileProvider;
