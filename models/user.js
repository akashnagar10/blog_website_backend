const { createHmac, randomBytes } = require("crypto");

const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    salt: {
      type: String,
      //   required: true,
    },
    password: {
      type: String,
      required: true,
    },
    profileImageURL: {
      type: String,
      default: "/images/default-profile.png",
    },
    role: {
      type: String,
      enum: ["USER", "ADMIN"],
      default: "USER",
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function () {
    const user = this;
  
    if (!user.isModified("password")) return;
  
    const salt = randomBytes(16).toString("hex");
  
    const hashedPassword = createHmac("sha256", salt)
      .update(user.password)
      .digest("hex");
  
    user.salt = salt;
    user.password = hashedPassword;
  });

  userSchema.static("matchPassword", function (email, password) {
    const user = this.findOne({ email });
  
    if (!user) throw new Error("User not found");
  
    const hashedPassword = createHmac("sha256", user.salt)
      .update(password)
      .digest("hex");

      if(hashedPassword !== user.password) throw new Error("Invalid credentials");
  
    return {...user, password: undefined, salt: undefined};
  });

const User = model("User", userSchema);

module.exports = User;
