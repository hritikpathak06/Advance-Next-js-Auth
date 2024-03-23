import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs"

interface UserModel extends Document {
  username: string;
  email: string;
  password: string;
  isVerified: boolean;
  isAdmin: boolean;
  forgotPasswordToken: string;
  forgotPasswordTokenExpiry: Date;
  verifyToken: string;
  verifyTokenExpire: Date;
};


const userSchema = new Schema<UserModel>({
  username: {
    type: String,
    required: [true, "Please Enter Your Username"],
  },
  email: {
    type: String,
    required: [true, "Please Enter Your Email"],
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  forgotPasswordToken: String,
  forgotPasswordTokenExpiry: Date,
  verifyToken: String,
  verifyTokenExpire: Date,
});


// Hashing The Password
userSchema.pre("save",async function (next){
  if(!this.isModified("password")){
    next();
  }
  this.password = await bcrypt.hash(this.password,10);
})


// Compare The Password
userSchema.methods.comparePassword = async function(password:string){
   return bcrypt.compare(password,this.password);
}


const User =
  mongoose.models.User || mongoose.model<UserModel>("User", userSchema);

export default User;
