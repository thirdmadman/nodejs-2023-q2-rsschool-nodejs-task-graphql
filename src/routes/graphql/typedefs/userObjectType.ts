import {
  GraphQLFloat,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';
import { UUIDType } from '../types/uuid.js';

import { getProfileField } from '../resolvers/profile/queries.js';
import { getPostsField } from '../resolvers/post/queries.js';
import { getUserSubscribedToField, getUsersSubscribedToUserField } from '../resolvers/user/queries.js';

export const userObjectType: GraphQLObjectType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: new GraphQLNonNull(UUIDType) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    balance: { type: new GraphQLNonNull(GraphQLFloat) },
    profile: getProfileField,
    userSubscribedTo: getUserSubscribedToField,
    subscribedToUser: getUsersSubscribedToUserField,
    posts: getPostsField,
  }),
});