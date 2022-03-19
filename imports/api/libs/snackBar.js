/**
 * Petit Store
 * Using ~Meteor~ Reactive Dict
 */

import { ReactiveDict } from "meteor/reactive-dict";

export default new ReactiveDict({
  snackbar: {
    open: false,
    msg: "",
    severity : "",
  },
});
