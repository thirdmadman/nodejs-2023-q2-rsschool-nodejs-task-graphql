import { changePost, createPost, deletePost } from './post/mutations.js';
import { changeProfile, createProfile, deleteProfile } from './profile/mutations.js';
import { changeUser, createUser, deleteUser, subscribeTo, unsubscribeFrom } from './user/mutations.js';

export const mutation = {
  createPost,
  createProfile,
  createUser,
  deleteUser,
  deleteProfile,
  deletePost,
  changeUser,
  changePost,
  changeProfile,
  subscribeTo,
  unsubscribeFrom,
};
