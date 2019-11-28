import mongoose, { Schema} from "mongoose";
import { DeptSchema, Departments } from "./Departments";

var PeopleSchema = new mongoose.Schema({
	_id: String!,
    firstName: String,
    lastName: String,
    jobTitle: String,
    departmentId: String,
    managerId: String
},
    {
        versionKey: false // set to false then it wont create in mongodb
    });

var People = mongoose.model("people", PeopleSchema);
export { People };