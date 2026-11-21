import mongoose from "mongoose";

const userSchema = new mongoose.Schema(

  {
    name:{
    type: String,
    required: true,
  },
  
    emails: {
      type: String,
      required: true,
      unique: true,
      lowerCase: true,
    },

      password: {
        type: String,
        required: false,
      },

      googleId: {
      type: String,
      default: null,
    },
    avatar: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
