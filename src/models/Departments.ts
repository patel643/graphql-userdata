import mongoose from "mongoose";

export const DeptSchema = new mongoose.Schema({
  _id: String,
  name: String
}, {
    versionKey: false // set to false then it wont create in mongodb
});

var Departments = mongoose.model("departments", DeptSchema);
export { Departments };
