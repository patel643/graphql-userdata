import mongoose from "mongoose";
import { Departments } from "../models/Departments";

export function insertDept() {
    var depts = [
        { "name": "Sales", "_id": "cfd90465-28fa-4b9a-be3e-ef2517e987e9" },
        { "name": "Marketing", "_id": "252fc1e8-aead-45cc-9d7d-e6003897bbf9" },
        { "name": "Operations", "_id": "e573dd1c-4cd4-451d-a844-a25210e91135" },
        { "name": "Management", "_id": "2b9edccb-41fc-4fc5-b832-ac86a034a877" },
        { "name": "Executive", "_id": "aef293ee-8dcc-4d89-99cf-1b8f61bab07b" },
        { "name": "HR", "_id": "ddd31c01-a30d-4e72-8e8b-d710fcc4fb56" }];

    Departments.collection.insertMany(depts, onInsert);

}
 
function onInsert(err, docs) {
    if (err) {
        //TODO
    } else {
        console.log('Departments data was successfully stored.');
    }
}