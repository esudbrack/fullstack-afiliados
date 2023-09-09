"use strict";

class Admin {
  async handle({ auth, response }, next) {
    return auth.user.is_admin
      ? await next()
      : response.status(403).send({
          status: 403,
          message: "YOU SHALL NOT PASS!",
        });
  }
}

module.exports = Admin;
