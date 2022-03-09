import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000" });

/** Function that receive the token back in the backend to verify if the user its log in */

API.interceptors.request.use((req) => {
  // Get the token for that specific profile
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }
  return req;
});

export const getPosts = () => API.get("/posts");
export const createPost = (newPost) => API.post("/posts", newPost);
export const updatePost = (id, updatedPost) =>
  API.patch(`/posts/${id}`, updatedPost);

export const deletePost = (id) => API.delete(`/posts/${id}`);

export const likePost = (id) => API.patch(`/posts/${id}/likePost`);

export const sigIn = (formData) => API.post("/users/sigIn", formData);
export const sigUp = (formData) => API.post("/users/sigUp", formData);
