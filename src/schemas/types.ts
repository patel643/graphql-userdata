import { gql } from "apollo-server-express";

const typeDefs = gql`
  type Query {
    departments(id: String): [Departments!]!
    people(id: String): [People!]!
    getPeopleByName(firstName: String, lastName: String): [People!]!
    getPeopleByJob( jobTitle: String!): [People!]!
    getManagers(id:String!): [Hierarchy!]!
    isManagerOf(id:String!): [Hierarchy!]!
  }


   type Mutation {
     updatePeople(id: String!, firstName: String, lastName: String, jobTitle: String, departmentId: String, managerId: String ): People
     addPeople(_id: String!, firstName: String, lastName: String, jobTitle: String, departmentId: String, managerId: String ): People
     deletePeople(id: String!): People
     updateDept(id: String!, name: String!): Departments
     addDept(_id: String!, name: String!): Departments
      deleteDept(id:String): Departments
    }

   type Departments {
    _id: String!
    name: String!
  }


   type Hierarchy{
        _id: String!
        firstName: String
        lastName: String
        jobTitle: String
        departmentId: String
        managerId: String
        department: String
        manages: [Hierarchy]
    }

  type People {
    _id: String!
    firstName: String
    lastName: String
    jobTitle: String
    departmentId: String
    managerId: String
  }
`;

export default typeDefs;

