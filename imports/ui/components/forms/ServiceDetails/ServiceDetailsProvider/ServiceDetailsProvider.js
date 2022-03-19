import React, { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useTracker } from "meteor/react-meteor-data";
import DetailsTabs from "../../../DetailsTabs/DetailsTabs";
import { ServicesCollection } from "../../../../../api/services/services";
import modal from "../../../../../libs/modal";
import ServiceProcessModal from "../../../Modal/ServiceProcessModal/ServiceProcessModal";
import "./style.scss";
import { ReviewsCollection } from "../../../../../api/reviews/reviews";

const btnRender = (id, service, action) => {
  if (service?.isPending) {
    return (
      <div className="opinion-box">
        <div className="opinion-box__btn">
          <button
            onClick={() => {
              action({
                text: "Are you sure you will the work ?",
                handler: () =>
                  Meteor.call("ServicesCollection.progress.update", id, () => {
                    Meteor.call(
                      "notification.insert",
                      `accepted and begin the work`,
                      service.seeker,
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
            Mark as in progress
          </button>
        </div>
        <div className="opinion-box__btn">
          <button
            onClick={() => {
              action({
                text: "Are you sure you will Decline the work ?",
                handler: () =>
                  Meteor.call(
                    "ServicesCollection.providerDecline.update",
                    id,
                    () => {
                      Meteor.call(
                        "notification.insert",
                        `has declined the work`,
                        service.seeker,
                        id
                      );
                    }
                  ),
              });
              modal.set("modalServiceProcess", {
                open: true,
              });
            }}
            className="btn btn-danger"
          >
            Decline service
          </button>
        </div>
      </div>
    );
  }
  if (service?.isRejectedProvider) {
    return (
      <button disabled className="btn btn-danger">
        You rejected the work
      </button>
    );
  }
  if (service?.isInProgress) {
    return (
      <button
        onClick={() => {
          action({
            text: "Are you sure you finished the work ?",
            handler: () =>
              Meteor.call("ServicesCollection.finished.update", id, () => {
                Meteor.call(
                  "notification.insert",
                  `finished the work and waiting for your approval`,
                  service.seeker,
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
        Mark as finished
      </button>
    );
  }
  if (service?.isFinished) {
    return (
      <button disabled className="btn btn-primary">
        Waiting for approval
      </button>
    );
  }
  if (service?.isAccepted) {
    return (
      <button disabled className="btn btn-primary">
        Service is Finished
      </button>
    );
  }
  if (service?.isRejected) {
    return (
      <button disabled className="btn btn-primary">
        Client rejected the service
      </button>
    );
  }
};

const ServiceDetailsProvider = () => {
  const { id } = useParams();
  const [modalProcess, setmodalProcess] = useState({ text: "", handler: null });
  const service = useTracker(() => {
    Meteor.subscribe("services");
    return ServicesCollection.findOne(id);
  });
  const client = useTracker(() => {
    Meteor.subscribe("allUsers");
    return Meteor.users.findOne(service?.seeker);
  });
  const reviews = useTracker(() => {
    Meteor.subscribe("reviews");

    return ReviewsCollection.find({ serviceId: id }).fetch();
  });

  return (
    <div className="content ServiceDetailsProvider">
      <ServiceProcessModal
        msg={modalProcess.text}
        handler={modalProcess.handler}
      ></ServiceProcessModal>
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
                <h5 className="card-title">Client</h5>
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
                      {`${client?.profile?.name} ${client?.profile?.lastName}`}
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

export default ServiceDetailsProvider;
