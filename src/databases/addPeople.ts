import mongoose from "mongoose";
import { People } from "../models/People";
import peopleJson from './People.json';

export function insertPeople() {

    var people = peopleJson;
    People.collection.insertMany(people, onInsert);

}

function onInsert(err, docs) {
    if (err) {
        //TODO
    } else {
        console.log('People data was successfully stored.');
    }
}