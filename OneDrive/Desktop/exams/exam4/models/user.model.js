const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const { type } = require("os");


let UserSchema = new mongoose.Schema(
    {
        name: {type: String, required: true},
        username: {type: String, required: true, unique: true},
        email: {type: String, required: true, unique: true, validate: [validator.isEmail, "Noto'g'ti email"]},
        password: {type: String, required: [true, "Parolni kiritish majburiy"]},
        age: {type: Number},
        image: {type: String},
        refreshToken: {type: String, select: false},
        role: { type: String, enum: ["user", "guide", "admin"], default: "user" },
    },
    {
      toJSON: { virtuals: true },
      toObject: { virtuals: true },
      timestamps: true,
    }
)


UserSchema.pre("save", async function (next) {
    let password = this.password;
    this.password = await bcrypt.hash(password, 12);
    console.log(this.password);
  
    next();
});


UserSchema.virtual("blogs", {
    ref: "blogs",
    localField: "_id",
    foreignField: "author",
});

let User = mongoose.model('users', UserSchema)

module.exports = User