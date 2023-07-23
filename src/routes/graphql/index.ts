import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import { createGqlResponseSchema, gqlResponseSchema } from './schemas.js';
import { graphql, GraphQLObjectType, GraphQLSchema, parse, validate } from 'graphql';
import { query } from './resolvers/query.js';
import { mutation } from './resolvers/mutation.js';
import depthLimit from 'graphql-depth-limit';


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

      
      const validationErrors = validate(schema, parse(req.body.query), [depthLimit(5)]);
      if (validationErrors) {
        return { data: null, errors: validationErrors };
      }

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
