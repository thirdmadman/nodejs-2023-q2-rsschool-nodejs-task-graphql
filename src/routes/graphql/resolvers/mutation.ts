import { createPost } from "./post/mutations.js";
import { createProfile } from "./profile/mutations.js";
import { createUser } from "./user/mutations.js";

export const mutation = {
  createPost,
  createProfile,
  createUser
};
