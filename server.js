import {ApolloServer, AuthenticationError} from 'apollo-server';
import mongoose from 'mongoose';
import dotenv from 'dotenv'

import userService from './modules/user/user.service';
import verifyUser from './utils/verifyUser';
import resolvers from './resolvers';
import schema from './types.graphql';

const server = new ApolloServer({
    typeDefs: schema,
    resolvers,
    context: async ({ req }) => {
        const { token } = req.headers || '';
        if (token) {
            const user = verifyUser(token);
            if (!user) throw new AuthenticationError('Invalid authorization token')
            return {
                user: await userService.getUserByFieldOrThrow('email', user.email),
            };
        }
    },
})

dotenv.config();

const PORT = process.env.PORT || 5001;

mongoose.connect(process.env.MONGO_URL, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useFindAndModify: false
    }
);

const dbConnection = mongoose.connection;
dbConnection.on('error', err => console.log(`Connection error: ${err}`));
dbConnection.once('open', () => console.log(`Connected to DB`));

server.listen(PORT, err => {
    err ? console.log(err) : console.log(`Server started at ${PORT}!`);
});
