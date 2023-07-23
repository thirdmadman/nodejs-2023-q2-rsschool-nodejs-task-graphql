import { createPost, deletePost } from "./post/mutations.js";
import { createProfile, deleteProfile } from "./profile/mutations.js";
import { createUser, deleteUser } from "./user/mutations.js";

export const mutation = {
  createPost,
  createProfile,
  createUser,
  deleteUser,
  deleteProfile,
  deletePost,
};
