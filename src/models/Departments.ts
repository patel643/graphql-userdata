import mongoose from "mongoose";


//creating Department Schema for Mongoose model
export const DeptSchema = new mongoose.Schema({
  _id: String,
  name: String
}, {
    versionKey: false // set to false then it wont create in mongodb
});

//create Department model
var Departments = mongoose.model("departments", DeptSchema);
export { Departments };
