require('dotenv').config()
var express = require('express');
var { graphqlHTTP } = require('express-graphql');
var { buildSchema } = require('graphql');
var accountService = require('./AccountService');


var schema = buildSchema(`
    type Query {
        validateAccountDetails(userAccountNumber: String, userBankCode: String, userAccountName: String): String
    }
`);

var root = {
    validateAccountDetails: ({userAccountNumber, userBankCode, userAccountName}) => {
        accountService.validateAccountDetails(userAccountNumber, userBankCode, userAccountName);
        // console.log(result)
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

