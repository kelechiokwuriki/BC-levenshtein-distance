require('dotenv').config()
var express = require('express');
var { graphqlHTTP } = require('express-graphql');
var { buildSchema } = require('graphql');
var accountService = require('./AccountService');


var schema = buildSchema(`
    input AccountValidationInput {
        userAccountNumber: String
        userBankCode: String
        userAccountName: String
    }

    type Query {
        validateAccountDetails(userAccountNumber: String): String
      }

    type UserAccount {
        userAccountNumber: String
        userBankCode: String
        userAccountName: String
    }

    type Mutation {
        validateAccountDetails(input: AccountValidationInput): String
    }
`);

class UserAccount {
    constructor(userAccountNumber, userBankCode, userAccountName) {
      this.userAccountNumber = userAccountNumber;
      this.userBankCode = userBankCode;
      this.userAccountName = userAccountName;
    }
}

var root = {
    validateAccountDetails: async ({input}) => {
        const result = await accountService.validateAccountDetails(input.userAccountNumber, input.userBankCode, input.userAccountName);
        console.log(result.data.data);
    }
};

var app = express();
app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true
}));

app.listen(4000);
console.log('Running a GraphQL API server at localhost:4000/graphql');

