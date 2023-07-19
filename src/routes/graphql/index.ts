import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import { createGqlResponseSchema, gqlResponseSchema } from './schemas.js';
import { graphql, GraphQLObjectType, GraphQLSchema, GraphQLList, GraphQLNonNull } from 'graphql';
import { UUIDType } from './types/uuid.js';
import { postObjectType } from './typedefs/postObjectType.js';
import { userObjectType } from './typedefs/userObjectType.js';
import { getAllPosts, getPostById } from './resolvers/post/queries.js';
import { getAllUsers } from './resolvers/user/queries.js';


const queryType = new GraphQLObjectType({
  name: "Query",
  fields: {
    post: {
      type: postObjectType,
      args: {
        id: { type: new GraphQLNonNull(UUIDType) },
      },
      resolve: getPostById
    },
    posts: {
      type: new GraphQLNonNull(new GraphQLList(postObjectType)),
      resolve: getAllPosts,
    },
    users: {
      type: new GraphQLNonNull(new GraphQLList(userObjectType)),
      resolve: getAllUsers,
    }
  },
})

const schema = new GraphQLSchema({ query: queryType })

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
        rootValue: fastify
      });
    },
  });
};

export default plugin;
