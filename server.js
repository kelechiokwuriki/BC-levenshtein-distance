require('dotenv').config()
var express = require('express');
var { graphqlHTTP } = require('express-graphql');
var { buildSchema } = require('graphql');
var accountService = require('./AccountService');
const utility = require('./Utility');
const levenshteinDistanceAllowed = process.env.LEVENSHTEINDISTANCEALLOWED;


var schema = buildSchema(`
    input AccountValidationInput {
        userAccountNumber: String
        userBankCode: String
        userAccountName: String
    }

    type Query {
        getAccountDetails(userAccountNumber: String): UserAccount
    }

    type UserAccount {
        userAccountNumber: String
        userBankCode: String
        userAccountName: String
    }

    type Mutation {
        validateAccountDetails(input: AccountValidationInput): UserAccount
    }
`);

class UserAccount {
    constructor(userAccountNumber, userBankCode, userAccountName) {
      this.userAccountNumber = userAccountNumber;
      this.userBankCode = userBankCode;
      this.userAccountName = userAccountName;
    }
}

// FAKE DATABASE FOR THIS TEST
var fakeUserDatabase = {
    '2058559716': { verified: false }
};

var root = {
    validateAccountDetails: async ({input}) => {
        const result = await accountService.validateAccountDetails(input.userAccountNumber, input.userBankCode, input.userAccountName);
        const { data } = result.data;

        let accountNameDistanceCheck = utility.levenshteinDistanceCalculator(result.data.data.account_name, input.userAccountName);

        if (data.account_name === input.userAccountName || accountNameDistanceCheck <= levenshteinDistanceAllowed) {
            fakeUserDatabase[input.userAccountNumber].verified = true;
        } 

        return new UserAccount(data.account_number, input.userBankCode, data.account_name);
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

