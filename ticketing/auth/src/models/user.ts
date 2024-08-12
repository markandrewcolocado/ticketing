import mongoose from 'mongoose';
import { Password } from '../services/password';

// An interface that describes the properties that are required to create a new User
interface UserAttrs {
  email: string;
  password: string;
}

// An interface that describes the properties that a User model(COLLECTION OF USERS) has
// Take all the properties that already exist and add it to this one that we are creating
// and add some new properties
interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}

// An interface that describes the properties that a User Document(A SINGLE USER) has
interface UserDoc extends mongoose.Document {
  email: string;
  password: string;
}

const userSchema = new mongoose.Schema({
  email: {
    type: String, // we are referring to types related to mongoose and not on typescript
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// A middleware function implemented in Mongoose
// This function will run before an attempt to save a document to our database.
// we also defined the function using the function keyword to have access to the 'this' keyword
// the 'this' keyword in arrow function points to the entire file
userSchema.pre('save', async function (done) {
  // Hash the password only if it is modified
  // Mongoose thinks that creating a user for the first time is also password modification so it will run this function
  if (this.isModified('password')) {
    const hashed = await Password.toHash(this.get('password'));
    this.set('password', hashed);
  }
  // call done once we are done hashing the password.
  done();
});

// Alternative SOLUTION
// This is how to add a custom function built into a model
userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};

// Angle brackets are called generics in typescript
// They allow us to customise the types being used inside of a function, a class or an interface
const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

// USAGE
// const user = User.build({
//   email: 'test',
//   password: 'asdfasdf'
// })

// ISSUE
// TypeScript is not checking the type of arguments we are passing to that constructor.
// Even if we put numbers instead of string, or invalid arguments
// const user = new User({
//   email: 123123,
//   password: 123123,
//   asdfasd: 13123
// })

// SOLUTION
// Create an interface to tell the required properties
// Define a new function what will be called whenever we are creating a user
// The function accepts a parameter that implements the interface
// This will tell the typescript if we are putting incorrect attributes
// const buildUser = (attrs: UserAttrs) => {
//   return new User(attrs);
// };

export { User };
