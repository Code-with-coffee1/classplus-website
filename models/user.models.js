const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      trim: true,
      required: true,
      max: 12,
      unique: true,
      index: true,
      lowercase: true,
    },
    name: {
      type: String,
      trim: true,
      required: true,
      max: 32,
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      minlength: 8,
      maxlength: 16,
      trim: true,
      required: true,
    },
    isActive: {
      type: Boolean,
      trim: true,
      default: false,
    },
    resetPasswordLink: {
      data: String,
      default: "",
    },
    // role: {
    //     type: Number,
    //     default: 0
    // }
    _class: {
      type: Number,
      required: true,
      trim: true,
    },
    parentPhoneNo: {
      type: String,
      required: true,
      minlength: 10,
      maxlength: 10,
    },
    parentPhoto1: {
      type: String,
    },
    parentPhoto2: {
      type: String,
    },
    testIds: [],
    enrolledBatches: [
      {
        type: ObjectId,
        ref: "new_batches",
      },
    ],
    requestedBatches: [
      {
        type: ObjectId,
        ref: "new_batches",
      },
    ],
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    // console.log(`The current password is ${this.password}`);
    this.password = await bcrypt.hash(this.password, 10);
    // console.log(`The current password is ${this.password}`);
  }
  next();
});

module.exports = mongoose.model("User", userSchema);
