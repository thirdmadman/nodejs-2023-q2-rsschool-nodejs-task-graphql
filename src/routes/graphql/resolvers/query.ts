import { memberType, memberTypes } from './member-type/queries.js';
import { post, posts } from './post/queries.js';
import { profile, profiles } from './profile/queries.js';
import { user, users } from './user/queries.js';

export const query = {
  post,
  posts,
  user,
  users,
  memberType,
  memberTypes,
  profile,
  profiles
};
