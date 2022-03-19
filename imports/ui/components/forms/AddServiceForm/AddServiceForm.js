import React from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useTracker } from "meteor/react-meteor-data";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import EntryText from "../../Entry/EntryText/EntryText";
import EntrySelect from "../../Entry/EntrySelect/EntrySelect";
import { optionsCategory, optionsSubCategory } from "./options";

const FORM_VALIDATION = Yup.object().shape({
  title: Yup.string().required(),
  location: Yup.string().required(),
  category: Yup.string().required(),
  subCategory: Yup.string().required(),
  description: Yup.string().required(),
  phone: Yup.string().required(),
});
const INITIAL_STATE = {
  title: "",
  location: "",
  category: "",
  subCategory: "",
  description: "",
  phone: "",
};

const AddServiceForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const onSubmitHandler = (values, resetForm) => {
    Meteor.call(
      "ServicesCollection.insert",
      values.title,
      values.location,
      values.category,
      values.subCategory,
      values.description,
      values.phone,
      id,
      Meteor.userId(),
      (err, serviceId) => {
        if (err) {
        } else {
          console.log("what what ::::", serviceId);
          resetForm();
          Meteor.call(
            "notification.insert",
            `has booked a service`,
            id,    
            serviceId
          );
          navigate("/services", { replace: true });
        }
      }
    );
  };

  return (
    <div className="content">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <div className="section-header text-center">
              <h2>Add Service</h2>
            </div>
            <Formik
              initialValues={{ ...INITIAL_STATE }}
              validationSchema={FORM_VALIDATION}
              onSubmit={(values, { resetForm }) =>
                onSubmitHandler(values, resetForm)
              }
            >
              {({ isValid, dirty }) => {
                return (
                  <Form>
                    <div className="service-fields mb-3">
                      <h3 className="heading-2">Service Information</h3>
                      <div className="row">
                        <div className="col-lg-6">
                          <div className="form-group">
                            <label>
                              Service Title
                              <span className="text-danger">*</span>
                            </label>
                            <EntryText
                              name="title"
                              placeholder="Enter service title"
                            ></EntryText>
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="form-group">
                            <label>
                              Service Location
                              <span className="text-danger">*</span>
                            </label>
                            <EntryText
                              name="location"
                              placeholder="Enter service location"
                            ></EntryText>
                          </div>
                        </div>
                        <div className="col-lg-12">
                          <div className="form-group">
                            <label>
                              Phone Number
                              <span className="text-danger">*</span>
                            </label>
                            <EntryText
                              name="phone"
                              placeholder="Enter your phone number"
                            ></EntryText>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="service-fields mb-3">
                      <h3 className="heading-2">Service Category</h3>
                      <div className="row">
                        <div className="col-lg-6">
                          <div className="form-group">
                            <label>
                              Category <span className="text-danger">*</span>
                            </label>

                            <EntrySelect
                              options={optionsCategory}
                              name="category"
                            ></EntrySelect>
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="form-group">
                            <label>
                              Sub Category
                              <span className="text-danger">*</span>
                            </label>
                            <EntrySelect
                              options={optionsSubCategory}
                              name="subCategory"
                            ></EntrySelect>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="service-fields mb-3">
                      <h3 className="heading-2">Details Information</h3>
                      <div className="row">
                        <div className="col-lg-12">
                          <div className="form-group">
                            <label>
                              Descriptions
                              <span className="text-danger">*</span>
                            </label>
                            <EntryText
                              name="description"
                              placeholder="Enter your description"
                              multiline
                              rows={8}
                            ></EntryText>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="submit-section">
                      <button
                        className="btn btn-primary submit-btn"
                        type="submit"
                        disabled={!(isValid && dirty)}
                      >
                        Submit
                      </button>
                    </div>
                  </Form>
                );
              }}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddServiceForm;
