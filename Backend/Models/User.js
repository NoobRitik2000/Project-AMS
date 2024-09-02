import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';


const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    validate:{
validator:function (value){
return /^[A-Z]/.test(value);
},
message:'Username must start with an UPPERCASE letter'
    }
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    validate: {
      validator: function(value) {
        // Regular expression to check for minimum 7 characters, 
        // at least one special character, and at least one number
        const passwordRegex = /^(?=.*\d)(?=.*[!@#$%^&*]).{7,}$/;
        return passwordRegex.test(value);
      },
      message: 'Password must be at least 7 characters long and include at least one number and one special character',
    },
  },
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);

export default User;
