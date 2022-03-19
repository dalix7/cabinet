import React from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useTracker } from "meteor/react-meteor-data";
import DetailsTabs from "../../DetailsTabs/DetailsTabs";
import { ServicesCollection } from "../../../../api/services/services";
import ServiceDetailsProvider from "./ServiceDetailsProvider/ServiceDetailsProvider";
import ServiceDetailsClient from "./ServiceDetailsClient/ServiceDetailsClient";

const ServiceDetails = () => {
  const isProvider = useTracker(() => {
    return Meteor?.user()?.profile?.isProvider;
  });
  const isClient = useTracker(() => {
    return Meteor?.user()?.profile?.isClient;
  });

  return (
    <div>
      {isProvider && <ServiceDetailsProvider></ServiceDetailsProvider>}
      {isClient && <ServiceDetailsClient></ServiceDetailsClient>}
    </div>
  );
};

export default ServiceDetails;
