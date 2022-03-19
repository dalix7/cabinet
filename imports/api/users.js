import Simple from "simpl-schema";

import { Accounts } from "meteor/accounts-base";
const Schema = new Simple({
  email: {
    type: String,
    regEx: Simple.RegEx.Email,
    min: 4,
  },
});
Accounts.validateNewUser((user) => {
  const email = user.emails[0].address;
  Schema.validate({ email });
  return true;
});
