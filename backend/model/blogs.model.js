const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    name: {
      type: String
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    address: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Blog", blogSchema);
