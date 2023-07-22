import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import { createGqlResponseSchema, gqlResponseSchema } from './schemas.js';
import { graphql, GraphQLObjectType, GraphQLSchema } from 'graphql';
import { query } from './resolvers/query.js';
import { mutation } from './resolvers/mutation.js';


const queryType = new GraphQLObjectType({
  name: "Query",
  fields: query
});

const mutationType = new GraphQLObjectType({
  name: "Mutation",
  fields: mutation
});

const schema = new GraphQLSchema({ query: queryType, mutation: mutationType })

const plugin: FastifyPluginAsyncTypebox = async (fastify) => {
  fastify.route({
    url: '/',
    method: 'POST',
    schema: {
      ...createGqlResponseSchema,
      response: {
        200: gqlResponseSchema,
      },
    },
    async handler(req) {
      return graphql({
        schema,
        source: req.body.query,
        variableValues: req.body.variables,
        rootValue: fastify,
      });
    },
  });
};

export default plugin;
