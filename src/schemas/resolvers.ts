import { Departments } from "../models/Departments";
import { People } from "../models/People";
import { exists } from "fs";

const resolvers = {

    //
    //
    //updates, deletions and additions
    Mutation: {

        //update People Information
        async updatePeople(root: any, args: any) {
            const tempPeople = { ...args };
            delete tempPeople.id;
            return await People.findOneAndUpdate({ _id: args.id }, tempPeople);
        },

        //add a new Person - _id required
        async addPeople(root: any, args: any) {
            var tempPeople = { ...args };
            return await People.collection.insertOne(tempPeople, onInsert);
            function onInsert(err, docs) {
                if (err) {
                    console.log("not inserted");
                } else {
                    console.log('Person was successfully stored.');
                }
            }
        },

        //delete a Person based on their id
        async deletePeople(root: any, args: any) {
            return await People.findByIdAndDelete({ _id: args.id });
        },

        //update Department Information (Name)
        async updateDept(root: any, args: any) {
            const tempDept = { ...args };
            delete tempDept.id;
            return await Departments.findOneAndUpdate({ _id: args.id }, tempDept);
        },

        //add a new Department - _id required
        async addDept(root: any, args: any) {
            var tempDept = { ...args };
            return await Departments.collection.insertOne(tempDept, onInsert);
            function onInsert(err, docs) {
                if (err) {
                    console.log("not inserted");
                } else {
                    console.log('Department was successfully stored.');
                }
            }
        },

        //delete a Department based on their id
        async deleteDept(root: any, args: any) {
            return await Departments.findByIdAndDelete({ _id: args.id });
        }


    },


    //
    //
    //Queries
    Query: {

        //get complete departments list or by specific _id
        departments(root: any, args: any) {
            if (args.id != null)
                return Departments.find({ _id: args.id });
            else
                return Departments.find();
        },

        //get complete people list or by specific _id
        people(root: any, args: any) {
            if (args.id != null)
                return People.find({ _id: args.id });
            else
                return People.find();
        },

        //get people list by firstname or lastname or combination of both
        getPeopleByName(root: any, args: any) {
            if (args.firstName != null) {
                if (args.lastName != null)
                    return People.find({ firstName: args.firstName, lastName: args.lastName });
                else
                    return People.find({ firstName: args.firstName });
            }
            else if (args.lastName != null)
                return People.find({ lastName: args.lastName });
        },

        //get people list by job
        getPeopleByJob(root: any, args: any) {
                return People.find({ jobTitle: args.jobTitle });
        },




        //get details about all higher level from CEO until provided user 
        //user is leaf node and nested within
        //recieves a user ID
        async getManagers(root: any, args: any) {
            
            var user = await People.find({ _id: args.id }).lean();
            if (user[0].managerId == null) {
                var output = user;
                var dept = await Departments.find({ _id: output[0].departmentId }).lean();
                if (typeof dept[0] !== "undefined")
                    output[0].department = dept[0].name;
                else
                    output[0].department = null;
                console.log("Leaf node for user in People DB with id: ", args.id, " is at level: ", 0);
                return output;
            }


            //create base JSON object with queired user and peers - leaf nodes
            var createSet = await People.find({ managerId: user[0].managerId }).lean();

            //create Hierarchy type of schema for 2nd last level of tree
            var hier = await People.find({ _id: user[0].managerId }).lean();
            user = hier;
            hier[0].manages = createSet;

            //assign department names to user and peer group
            for (var i = 0; i < createSet.length; i++) {
                var dept = await Departments.find({ _id: createSet[i].departmentId }).lean();
                
                if (typeof dept[0] !== "undefined")
                    hier[0].manages[i].department = dept[0].name;
                else
                    hier[0].manages[i].department = null;
                
            }
   
            //assign department to current hier
            var dept = await Departments.find({ _id: hier[0].departmentId }).lean();
            if (typeof dept[0] !== "undefined")
                hier[0].department = dept[0].name;
            else
                hier[0].department = null;

            var numLevel = 1;
            var output = hier;
            if (hier[0].managerId == null) {
                console.log("Leaf node for user in People DB with id: ", args.id, " is at level: ", numLevel);
                return output;
            }

            //create all other levels until you reach root
            do {
                hier = await People.find({ _id: user[0].managerId }).lean(); 
                var dept = await Departments.find({ _id: hier[0].departmentId }).lean();
                if (typeof dept[0] !== "undefined")
                    hier[0].department = dept[0].name;
                else
                    hier[0].department = null;
                user = hier;
                hier[0].manages = output;
                output = hier;
                numLevel++;
            } while (user[0].managerId != null);

            
            // Displays total levels of the tree
            // this can be used to modify the GraphQL Query accordingly to get all the results
            console.log("Leaf node for user in People DB with id: ",args.id, " is at level: ", numLevel );

            return output;
            
            //complete getting managers 
        },


        //gives details about all immediate emplloyees working under the user if any
        async isManagerOf(root: any, args: any) {

            var user = await People.find({ _id: args.id }).lean();

            //create immediate set of workers if any
            var createSet = await People.find({ managerId: args.id }).lean();
            
            var hier = user;
            var dept = await Departments.find({ _id: hier[0].departmentId }).lean();

            if (typeof dept[0] !== "undefined")
                hier[0].department = dept[0].name;
            else
                hier[0].department = null;

            //check if there are employees who work under user
            if (typeof createSet[0] === "undefined") {
                return hier;
            }
            else {
                hier[0].manages = createSet;
                for (var i = 0; i < createSet.length; i++) {
                    var dept = await Departments.find({ _id: createSet[i].departmentId }).lean();

                    if (typeof dept[0] !== "undefined")
                        hier[0].manages[i].department = dept[0].name;
                    else
                        hier[0].manages[i].department = null;

                }
            }

            return hier;

        }
        

    }
};

export default resolvers;

