
import { Departments, DeptSchema } from '../src/models/Departments';
import 'mocha';
const mongoose = require("mongoose");



describe('Checking if MongoDb CRUD functions work properly using Departments model and schema', function () {

    //creating mongoose connection and genearting a Test Database
    before(function (done) {
        mongoose.connect('mongodb://localhost/Test');
        const db = mongoose.connection;
        db.on('error', console.error.bind(console, 'connection error'));
        db.once('open', function () {
            console.log('We are connected to Test database!');
            done();
        });
    });


    //Check if Insertion without Department ID returns error or not
    it('Inserting without ID!', function (done) {
        var s = new Departments({ name: 'Acc' });

        s.save(err => {
            if (err) {
                console.log("Inserting without ID gives error");
                return done();
            }
            throw new Error('Should generate error!');
        });

    });

    //Check if Department insertion works
    it('Department insert works!', function (done) {
        var s = new Departments({ _id: 'sidobq9389h3bdbkala', name: 'Acc' });

        s.save((err, name) => {
            if (err) { throw err; }
            else {
                console.log("Inserted");
            }
            done();
        });

    });

    //check if department can be found via id
    it('Department find works!', function (done) {
        var s = new Departments({ _id: 'sidobq9389h3bdbkala'});

        s.collection.findOne((err, name) => {
            if (err) { throw err; }
            else {
                console.log("Found");
            }
            done();


        });

    });

    //check if deletion works
    it('Department deletion works!', function (done) {
        var s = new Departments({ _id: "sidobq9389h3bdbkala"});

        s.remove((err, name) => {
            if (err) { throw err; }
            else {
                console.log("Found");
            }
            done();


        });

    });

    //close connection and drop Test DB
    after(function (done) {
        mongoose.connection.db.dropDatabase(function () {
            console.log("Tests Completed - Dropping Test Database");
            mongoose.connection.close(done);
        });
    });

});

