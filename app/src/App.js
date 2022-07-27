const express = require("express");
const cors = require("cors");
const routes = require("../routes");

require("dotenv").config();

class App {
  constructor() {
    this.app = express();
    this.port = process.env.SERVER_PORT;
    this.version = "v1"
    this.paths = {
      s3: `/${this.version}/s3`,
      account: `/${this.version}/account`,
      api: `/${this.version}/api`,
      book: `/${this.version}/book`,
      community: `/${this.version}/community`,
      event: `/${this.version}/event`,
      member: `/${this.version}/member`,
      topic: `/${this.version}/topic`,
      user: `/${this.version}/user`
    }

    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(express.json());
    this.app.use(cors());
    /*this.app.use(session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false
    }));*/
    // this.app.use((req, res, next) => {
    //   const render = res.render;
    //   const send = res.send;
    //   res.render = function renderWrapper(...args) {
    //     Error.captureStackTrace(this);
    //     return render.apply(this, args);
    //   };
    //   res.send = function sendWrapper(...args) {
    //     try {
    //       send.apply(this, args);
    //     } catch (err) {
    //       console.error(`Error in res.send | ${err.code} | ${err.message} | ${res.stack}`);
    //     }
    //   };
    //   next();
    // });
  }

  routes() {
    this.app.use(this.paths.s3, routes.S3Route);
    this.app.use(this.paths.account, routes.AccountRoute);
    this.app.use(this.paths.api, routes.ApiRoute);
    this.app.use(this.paths.book, routes.BookRoute);
    this.app.use(this.paths.community, routes.CommunityRoute);
    this.app.use(this.paths.event, routes.EventRoute);
    this.app.use(this.paths.member, routes.MemberRoute);
    this.app.use(this.paths.topic, routes.TopicRoute);
    this.app.use(this.paths.user, routes.UserRoute);
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Server listening on ${this.port}`);
    });
  }
}

module.exports = App;
