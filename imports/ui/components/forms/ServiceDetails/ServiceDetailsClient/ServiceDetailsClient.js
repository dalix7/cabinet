import React, { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useTracker } from "meteor/react-meteor-data";
import DetailsTabs from "../../../DetailsTabs/DetailsTabs";
import { ServicesCollection } from "../../../../../api/services/services";
import ServiceProcessModal from "../../../Modal/ServiceProcessModal/ServiceProcessModal";
import "./style.scss";
import modal from "../../../../../libs/modal";
import ReviewModal from "../../../Modal/ReviewModal/ReviewModal";
import { ReviewsCollection } from "../../../../../api/reviews/reviews";
const btnRender = (id, service, action) => {
  if (service?.isPending) {
    return (
      <button disabled className="btn btn-primary">
        Pending
      </button>
    );
  }
  if (service?.isInProgress) {
    return (
      <button disabled className="btn btn-primary">
        In progress
      </button>
    );
  }
  if (service?.isRejectedProvider) {
    return (
      <button disabled className="btn btn-danger">
        Provider rejected the work
      </button>
    );
  }
  if (service?.isFinished) {
    return (
      <div className="opinion-box">
        <div className="opinion-box__btn">
          <button
            onClick={() => {
              action({
                text: "Are you sure you Accepted the work ?",
                handler: () =>
                  Meteor.call("ServicesCollection.accepted.update", id, () => {
                    Meteor.call(
                      "notification.insert",
                      `approved the work`,
                      service.provider,
                      id
                    );
                  }),
              });
              modal.set("modalServiceProcess", {
                open: true,
              });
            }}
            className="btn btn-primary"
          >
            Accept Finished Service
          </button>
        </div>
        <div className="opinion-box__btn">
          <button
            onClick={() => {
              action({
                text: "Are you sure you will Decline the work ?",
                handler: () =>
                  Meteor.call("ServicesCollection.rejected.update", id, () => {
                    Meteor.call(
                      "notification.insert",
                      `declined the work`,
                      service.provider,
                      id
                    );
                  }),
              });
              modal.set("modalServiceProcess", {
                open: true,
              });
            }}
            className="btn btn-danger"
          >
            Decline Finished Service
          </button>
        </div>
      </div>
    );
  }
  if (service?.isAccepted) {
    return (
      <>
        <button disabled className="btn btn-primary">
          Service is Finished
        </button>
        <button
          onClick={() => {
            modal.set("modalReview", {
              open: true,
            });
          }}
          className="btn btn-primary btn--review"
        >
          Review the service
        </button>
      </>
    );
  }
  if (service?.isRejected) {
    return (
      <>
        <button disabled className="btn btn-primary">
          You rejected the service
        </button>
        <button
          onClick={() => {
            modal.set("modalReview", {
              open: true,
            });
          }}
          className="btn btn-primary btn--review"
        >
          Review the service
        </button>
      </>
    );
  }
};

const ServiceDetailsClient = () => {
  const { id } = useParams();
  const [modalProcess, setmodalProcess] = useState({ text: "", handler: null });
  const service = useTracker(() => {
    Meteor.subscribe("services");
    return ServicesCollection.findOne(id);
  });
  const provider = useTracker(() => {
    Meteor.subscribe("allUsers");
    return Meteor.users.findOne(service?.provider);
  });
  const reviews = useTracker(() => {
    Meteor.subscribe("reviews");
    return ReviewsCollection.find({ serviceId: id }).fetch();
  });

  return (
    <div className="content ServiceDetailsClient">
      <ServiceProcessModal
        msg={modalProcess.text}
        handler={modalProcess.handler}
      ></ServiceProcessModal>
      <ReviewModal id={id}></ReviewModal>
      <div className="container">
        <div className="row">
          <div className="col-lg-8">
            <div className="service-view">
              <div className="service-header">
                <div className="d-flex justify-content-between align-items-center">
                  <h1> {service?.title} </h1>
                  <div className="fav-btn fav-btn-big">
                    <a
                      href="javascript:void(0)"
                      className="fav-icon with-border"
                    >
                      <i className="fas fa-heart"></i>
                    </a>
                  </div>
                </div>
                <address className="service-location">
                  <i className="fas fa-location-arrow"></i>
                  {service?.location}
                </address>
                <div className="service-cate">
                  <a href="search.html"> {service?.category} </a>
                </div>
              </div>

              <div className="service-details">
                <DetailsTabs
                  title="Description"
                  para={service?.description}
                  reviews={reviews}
                ></DetailsTabs>
              </div>
            </div>
          </div>
          <div className="col-lg-4 theiaStickySidebar">
            <div className="sidebar-widget widget">
              <div className="service-amount">
                <span></span>
              </div>
              <div className="service-book">
                {btnRender(id, service, setmodalProcess)}
              </div>
            </div>
            <div className="card provider-widget clearfix">
              <div className="card-body">
                <h5 className="card-title">Service provider</h5>
                <div className="about-author">
                  <div className="about-provider-img">
                    <div className="provider-img-wrap">
                      <a href="javascript:void(0);">
                        <img
                          className="img-fluid rounded-circle"
                          alt=""
                          src="/assets/img/provider/provider-01.jpg"
                        />
                      </a>
                    </div>
                  </div>
                  <div className="provider-details">
                    <a href="javascript:void(0);" className="ser-provider-name">
                      {`${provider?.profile?.name} ${provider?.profile?.lastName}`}
                    </a>
                    <p className="last-seen">
                      <i className="fas fa-circle online"></i> Online
                    </p>
                    <p className="text-muted mb-1">Member Since Apr 2020</p>
                  </div>
                </div>
                <hr />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetailsClient;
