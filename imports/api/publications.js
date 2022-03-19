import { Meteor } from "meteor/meteor";

Meteor.publish("allUsers", function () {
  return Meteor.users.find({}, { fields: { emails: 1, profile: 1 } });
});



