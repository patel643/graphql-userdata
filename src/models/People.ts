import mongoose, { Schema} from "mongoose";

//creating People Schema for Mongoose model
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

//create people model
var People = mongoose.model("people", PeopleSchema);
export { People };