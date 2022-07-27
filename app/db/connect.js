const mongoose = require("mongoose");

require("dotenv").config();

class Connector {
  static connect() {
    this.dbname = encodeURIComponent(process.env.DB_NAME);
    this.dbpassword = encodeURIComponent(process.env.DB_PASSWORD);
    this.dbhost = process.env.DB_HOST;
    this.uri = `mongodb+srv://${this.dbname}:${this.dbpassword}@${this.dbhost}/?retryWrites=true&w=majority&ssl=true`;
    
    if (mongoose.connection.readyState === 0) {
      mongoose.connect(this.uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      }).then(() => {
        console.log("Database connected");
      }).catch((err) => {
        console.log(err);
      });
    }
  }
}

module.exports = Connector;
