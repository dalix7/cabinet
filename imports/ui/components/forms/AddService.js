import React from "react";
//import { addRepair } from "../../redux/actions/repair";
import { useState, useEffect } from "react";
//import { useDispatch, useSelector } from "react-redux";
import "./css_addService/addService.css";
import { useNavigate, useParams } from "react-router-dom";
import { useTracker } from "meteor/react-meteor-data";
import { Meteor } from "meteor/meteor";
import EntryText from "../Entry/EntryText/EntryText";
import { Form, Formik } from "formik";
import * as Yup from "yup";
// const INITIAL_STATE = {
//   name: "",
//   lastName: "",
//   tel: "",
//   address: "",
//   city: "",
//   state: "",
//   postalCode: "",
//   country: "",
//   description: "",
// };

const FORM_VALIDATION = Yup.object().shape({
  name: Yup.string(),
  lastName: Yup.string(),
  tel: Yup.string(),
  address: Yup.string(),
  city: Yup.string(),
  state: Yup.string(),
  postalCode: Yup.string(),
  country: Yup.string(),
  description: Yup.string(),
});

const AddService = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const user = useTracker(() => {
    return Meteor.user();
  });
  const INITIAL_STATE = useTracker(() => {
    return {
      name: user?.profile.name,
      lastName: user?.profile.lastName,
      tel: "",
      address: "",
      city: "",
      state: "",
      postalCode: "",
      country: "",
      description: "",
    };
  });

  const provider = useTracker(() => {
    Meteor.subscribe("allUsers");

    return Meteor.users.findOne(id);
  });
  const onSubmitHandler = (values, resetForm) => {
    Meteor.call(
      "ServicesCollection.insert",
      values.address,
      values.city,
      values.postalCode,
      values.state,
      values.description,
      values.tel,
      id,
      Meteor.userId(),
      (err, serviceId) => {
        if (err) {
        } else {
          console.log("what what ::::", serviceId);
          resetForm();
          Meteor.call(
            "notification.insert",
            `${user?.profile?.name} want service`,
            id,
            serviceId
          );
          navigate("/services", { replace: true });
        }
      }
    );
  };

  return (
    <div className=" section">
      <div className="container booking-form">
        <div className="form-header">
          <h1>request a service</h1>
        </div>
        {/* <pre style={{ display: "none" }}>
          {JSON.stringify(image_service, null, "\t")}
        </pre> */}
        <Formik
          initialValues={{ ...INITIAL_STATE }}
          validationSchema={FORM_VALIDATION}
          onSubmit={(values, { resetForm }) =>
            onSubmitHandler(values, resetForm)
          }
        >
          {({ isValid, dirty }) => {
            return (
              <Form className="proform">
                <div className="rowf proform__row">
                  <div className="leftf">
                    <label htmlFor="inputStreet">Name:</label>
                  </div>
                  <div className="rightf right-name">
                    <div className="proform__entry">
                      <EntryText
                        name="name"
                        label="Name"
                        variant="outlined"
                        placeholder="Enter your Name"
                        disabled
                      ></EntryText>
                    </div>
                    <div className="proform__entry">
                      <EntryText
                        name="lastName"
                        label="Last name"
                        variant="outlined"
                        placeholder="Enter your last name"
                        disabled

                        //value={user?.profile?.lastName}
                      ></EntryText>
                    </div>

                    {/* <input
                      className="form-control vv"
                      type="text"
                      placeholder="Enter your name"
                      name="name"
                      defaultValue={user?.profile.name}
                      disabled
                    /> */}

                    {/* <input
                      className="form-control "
                      type="text"
                      placeholder="Enter your last name"
                      name="lastName"
                      defaultValue={user?.profile.lastName}
                      disabled
                    /> */}
                  </div>
                </div>
                <div className="rowf proform__row">
                  <div className="leftf">
                    <label htmlFor="inputStreet">Phone:</label>
                  </div>
                  <div className="rightf">
                    <EntryText
                      label="phone"
                      type="tel"
                      name="tel"
                      placeholder="Enter your phone number"
                    ></EntryText>

                    {/* <input
                      className="form-control"
                      type="tel"
                      name="tel"
                      placeholder="Enter your phone number"
                    /> */}
                  </div>
                </div>
                <div className="rowf proform__row">
                  <div className="leftf">
                    <label htmlFor="inputStreet">address:</label>
                  </div>
                  <div className="rightf">
                    <div className="proform__row">
                      <EntryText
                        label="address"
                        name="address"
                        placeholder="Street"
                      ></EntryText>
                    </div>

                    {/* <input
                      type="text"
                      className="form-control"
                      id="inputStreet"
                      name="address"
                      placeholder="Street"
                    /> */}
                    <div className="proform__row">
                      <EntryText
                        label="city"
                        name="city"
                        placeholder="City"
                      ></EntryText>
                    </div>

                    <EntryText
                      label="state"
                      placeholder="State"
                      name="state"
                    ></EntryText>
                    {/* <input
                      type="city"
                      className="form-control"
                      id="inputCity"
                      name="city"
                      placeholder="City"
                    />

                    <input
                      type="state"
                      className="form-control"
                      id="inputState"
                      placeholder="State"
                      name="state"
                    /> */}
                  </div>
                </div>
                <div className="rowf proform__row">
                  <div className="leftf">
                    <label htmlFor="inputZip">code Postal:</label>
                  </div>
                  <div className="rightf">
                    <EntryText
                      label="postal code"
                      placeholder="Zip"
                      name="postalCode"
                    ></EntryText>
                    {/* <input
                      type="zip"
                      className="form-control"
                      id="inputZip"
                      placeholder="Zip"
                      name="postalCode"
                    /> */}
                  </div>
                </div>
                <div className="rowf proform__row">
                  <div className="leftf">
                    <label htmlFor="inputCountry">pays:</label>
                  </div>
                  <div className="rightf">
                    <EntryText
                      label="country"
                      placeholder="Country"
                      name="country"
                    ></EntryText>
                    {/* <input
                      type="country"
                      className="form-control"
                      id="inputCountry"
                      placeholder="Country"
                      name="country"
                    /> */}
                  </div>
                </div>
                <div className="rowf proform__row">
                  <div className="leftf">
                    <label htmlFor="inputCountry">Description:</label>
                  </div>
                  <div className="rightf">
                    <EntryText
                      multiline
                      placeholder="Enter your service description"
                      rows="10"
                      name="description"
                      label="description"
                    ></EntryText>
                    {/* <textarea
                      className="form-control-textarea "
                      type="text"
                      placeholder="Enter your service description"
                      rows="6"
                      name="description"
                    /> */}
                  </div>
                </div>

                <div className="form-btn">
                  <button className="submit-btn" type="submit">
                    Request Now
                  </button>
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
};

export default AddService;
